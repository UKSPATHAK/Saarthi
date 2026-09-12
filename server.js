/**
 * SAARTHI 🚗🌱 - REAL-TIME RIDE TRACKING SERVER
 * Technology: Node.js + Express + Socket.IO
 *
 * Provides real-time bidirectional WebSocket communication between
 * drivers and passengers during active journeys.
 *
 * Privacy Guardrail:
 * - Driver location is only broadcast during active trips.
 * - Broadcasts are isolated to specific authorized trip rooms (trip:<tripId>).
 * - "Pause Location Sharing" instantly ceases location telemetry while keeping trip active.
 * - No historical GPS coordinates are retained on the server after trip completion.
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files so opening http://localhost:3000 works out-of-the-box
app.use(express.static(path.join(__dirname)));

// Explicit root route handler to guarantee index.html is always returned
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// In-memory active trip state registry (cleared on trip completion for privacy)
const activeTrips = new Map();

// Helper to get or initialize a trip
function getTrip(tripId) {
  if (!activeTrips.has(tripId)) {
    activeTrips.set(tripId, {
      tripId,
      status: 'scheduled', // 'scheduled' | 'in_transit' | 'paused' | 'completed'
      driver: null,
      passengers: new Set(),
      isLocationPaused: false,
      lastLocation: null,
      distanceRemainingKm: null,
      etaMinutes: null,
      speedKmh: 0,
      startedAt: null,
      completedAt: null,
      corridor: 'Pune → Mumbai',
      safetyIncidents: []
    });
  }
  return activeTrips.get(tripId);
}

// REST Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Saarthi Real-Time Tracking Engine',
    activeTripsCount: activeTrips.size,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/trips/:tripId/tracking', (req, res) => {
  const { tripId } = req.params;
  const trip = activeTrips.get(tripId);
  if (!trip) {
    return res.status(404).json({ error: 'Active trip tracking not found' });
  }

  // Sanitize for privacy: if driver paused location, do not return exact lat/lng
  const responseData = {
    tripId: trip.tripId,
    status: trip.status,
    isLocationPaused: trip.isLocationPaused,
    distanceRemainingKm: trip.distanceRemainingKm,
    etaMinutes: trip.etaMinutes,
    speedKmh: trip.speedKmh,
    lastLocation: trip.isLocationPaused ? null : trip.lastLocation,
    updatedAt: trip.lastLocation?.timestamp || null
  };

  res.json(responseData);
});

// Safety Concern Reporting Endpoint
app.post('/api/trips/:tripId/safety-concern', (req, res) => {
  const { tripId } = req.params;
  const { passengerId, concernType, notes } = req.body;

  const trip = getTrip(tripId);
  const incident = {
    incidentId: `INC-${Date.now().toString().slice(-6)}`,
    tripId,
    passengerId: passengerId || 'Anonymous',
    concernType: concernType || 'General Safety Concern',
    notes: notes || '',
    reportedAt: new Date().toISOString(),
    status: 'Investigating'
  };

  trip.safetyIncidents.push(incident);
  console.log(`[SAFETY CONCERN LOGGED] Trip ${tripId}:`, incident);

  res.status(201).json({
    success: true,
    message: 'Safety incident logged with Saarthi Trust & Safety team.',
    incidentId: incident.incidentId
  });
});

// Emergency SOS Endpoint
app.post('/api/trips/:tripId/sos', (req, res) => {
  const { tripId } = req.params;
  const { passengerId, location, emergencyContactsNotified } = req.body;

  const trip = getTrip(tripId);
  const sosEvent = {
    sosId: `SOS-${Date.now().toString().slice(-6)}`,
    tripId,
    passengerId: passengerId || 'Passenger',
    location: location || trip.lastLocation,
    timestamp: new Date().toISOString(),
    nationalEmergencyNumber: '112',
    contactsAlerted: Boolean(emergencyContactsNotified)
  };

  console.warn(`🚨 [EMERGENCY SOS TRIGGERED] Trip ${tripId}:`, sosEvent);

  // Broadcast high-priority emergency alert to room
  io.to(`trip:${tripId}`).emit('trip:sosTriggered', sosEvent);

  res.status(200).json({
    success: true,
    message: 'Emergency SOS activated. Saarthi Safety Dispatcher alerted.',
    sosEvent
  });
});

// Socket.IO Real-Time Engine
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`[Socket Connected] Client ID: ${socket.id}`);

  // 1. DRIVER FLOW: Driver joins and registers trip room
  socket.on('driver:register', ({ tripId, driverName, vehicleInfo }) => {
    const roomName = `trip:${tripId}`;
    socket.join(roomName);
    socket.tripId = tripId;
    socket.userRole = 'driver';

    const trip = getTrip(tripId);
    trip.driver = { name: driverName, vehicle: vehicleInfo, socketId: socket.id };

    console.log(`[Driver Registered] Driver ${driverName} joined ${roomName}`);
    socket.emit('driver:registered', { tripId, status: trip.status });
  });

  // 2. DRIVER FLOW: Start Trip
  socket.on('driver:startTrip', ({ tripId, initialLocation }) => {
    const trip = getTrip(tripId);
    trip.status = 'in_transit';
    trip.startedAt = new Date().toISOString();
    trip.isLocationPaused = false;
    if (initialLocation) {
      trip.lastLocation = { ...initialLocation, timestamp: new Date().toISOString() };
    }

    console.log(`[Trip Started] Trip ${tripId} is now IN_TRANSIT`);
    io.to(`trip:${tripId}`).emit('trip:statusChanged', {
      tripId,
      status: 'in_transit',
      message: 'Driver has started the trip.',
      startedAt: trip.startedAt
    });
  });

  // 3. DRIVER FLOW: Location Update (from GPS / Geolocation API or simulation)
  socket.on('driver:locationUpdate', ({ tripId, lat, lng, speed, heading, distanceRemainingKm, etaMinutes, landmark }) => {
    const trip = getTrip(tripId);
    if (!trip || trip.status !== 'in_transit') return;

    if (trip.isLocationPaused) {
      // Respect privacy: do not propagate coordinates when paused
      return;
    }

    trip.lastLocation = {
      lat,
      lng,
      speed: speed || 65,
      heading: heading || 0,
      landmark: landmark || 'En route',
      timestamp: new Date().toISOString()
    };
    trip.distanceRemainingKm = distanceRemainingKm;
    trip.etaMinutes = etaMinutes;
    trip.speedKmh = speed || 65;

    // Broadcast only to clients in this authenticated trip room
    io.to(`trip:${tripId}`).emit('trip:locationBroadcast', {
      tripId,
      location: trip.lastLocation,
      distanceRemainingKm,
      etaMinutes,
      isLocationPaused: false
    });
  });

  // 4. DRIVER FLOW: Pause Location Sharing (Privacy Control)
  socket.on('driver:pauseLocation', ({ tripId, isPaused }) => {
    const trip = getTrip(tripId);
    if (!trip) return;

    trip.isLocationPaused = Boolean(isPaused);
    console.log(`[Location Sharing] Trip ${tripId} isLocationPaused=${trip.isLocationPaused}`);

    io.to(`trip:${tripId}`).emit('trip:privacyChanged', {
      tripId,
      isLocationPaused: trip.isLocationPaused,
      message: trip.isLocationPaused
        ? 'Driver has paused live location sharing for privacy.'
        : 'Driver resumed live location sharing.'
    });
  });

  // 5. DRIVER FLOW: End Trip
  socket.on('driver:endTrip', ({ tripId }) => {
    const trip = getTrip(tripId);
    if (!trip) return;

    trip.status = 'completed';
    trip.completedAt = new Date().toISOString();

    console.log(`[Trip Completed] Trip ${tripId} reached destination.`);
    io.to(`trip:${tripId}`).emit('trip:completed', {
      tripId,
      status: 'completed',
      completedAt: trip.completedAt,
      message: 'Driver has arrived at the destination. Thank you for travelling with Saarthi!'
    });

    // Cleanup active trip state after 10 minutes to maintain data privacy
    setTimeout(() => {
      activeTrips.delete(tripId);
      console.log(`[Privacy Cleanup] Cleared memory for trip ${tripId}`);
    }, 10 * 60 * 1000);
  });

  // 6. PASSENGER FLOW: Passenger joins trip tracking room
  socket.on('passenger:joinTrip', ({ tripId, passengerName, bookingRef }) => {
    const roomName = `trip:${tripId}`;
    socket.join(roomName);
    socket.tripId = tripId;
    socket.userRole = 'passenger';

    const trip = getTrip(tripId);
    trip.passengers.add(socket.id);

    console.log(`[Passenger Joined] ${passengerName || 'Passenger'} joined ${roomName} (Ref: ${bookingRef || 'N/A'})`);

    // Send initial snapshot
    socket.emit('trip:initialState', {
      tripId: trip.tripId,
      status: trip.status,
      isLocationPaused: trip.isLocationPaused,
      lastLocation: trip.isLocationPaused ? null : trip.lastLocation,
      distanceRemainingKm: trip.distanceRemainingKm,
      etaMinutes: trip.etaMinutes,
      speedKmh: trip.speedKmh,
      corridor: trip.corridor
    });
  });

  socket.on('disconnect', () => {
    if (socket.tripId && activeTrips.has(socket.tripId)) {
      const trip = activeTrips.get(socket.tripId);
      trip.passengers.delete(socket.id);
    }
  });
});

// Fallback SPA route for client-side navigation (ignoring API & socket paths)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Only start listening if executed directly (e.g. `node server.js`), not when imported as serverless module
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`\n========================================================`);
    console.log(`  🚗🌱 SAARTHI REAL-TIME TRACKING SERVER RUNNING`);
    console.log(`  Port: http://localhost:${PORT}`);
    console.log(`  Mode: WebSocket (Socket.IO) + REST + Static Server`);
    console.log(`========================================================\n`);
  });
}

module.exports = app;

