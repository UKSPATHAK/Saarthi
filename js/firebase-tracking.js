/**
 * SAARTHI 🚗🌱 - FIREBASE AUTHENTICATION & FIRESTORE ADAPTER
 * Module: js/firebase-tracking.js
 *
 * Provides Cloud Firestore real-time trip state synchronization and
 * Firebase Authentication integration for production deployments.
 *
 * FIRESTORE SECURITY RULES CONTRACT:
 * -------------------------------------------------------------
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /trips/{tripId} {
 *       // Only authorized driver and booked passengers can view live location
 *       allow read: if request.auth != null &&
 *         (request.auth.uid == resource.data.driverId ||
 *          request.auth.uid in resource.data.passengerIds);
 *
 *       // Only the verified driver can update location telemetry and trip status
 *       allow update: if request.auth != null &&
 *         request.auth.uid == resource.data.driverId &&
 *         request.resource.data.driverId == resource.data.driverId;
 *     }
 *   }
 * }
 * -------------------------------------------------------------
 */

(function (global) {
  'use strict';

  class SaarthiFirebaseAdapter {
    constructor() {
      this.isInitialized = false;
      this.db = null;
      this.auth = null;
      this.activeListeners = new Map();
    }

    /**
     * Initialize Firebase with provided credentials or fall back gracefully
     */
    init(config) {
      const fbConfig = config || global.SAARTHI_FIREBASE_CONFIG;
      if (!fbConfig || !global.firebase) {
        console.info("[Saarthi Firebase] Running in standalone/demo mode (Firebase config not provided or using prototype state).");
        return false;
      }

      try {
        if (!global.firebase.apps.length) {
          global.firebase.initializeApp(fbConfig);
        }
        this.db = global.firebase.firestore();
        this.auth = global.firebase.auth();
        this.isInitialized = true;
        console.log("[Saarthi Firebase] Firestore real-time tracking initialized successfully.");
        return true;
      } catch (err) {
        console.warn("[Saarthi Firebase] Initialization failed, using local/demo adapter:", err);
        return false;
      }
    }

    /**
     * Driver syncs live location to Firestore doc `trips/{tripId}`
     */
    async syncTripLocation(tripId, locationData) {
      if (!this.isInitialized || !this.db) {
        // Standalone prototype mode: no-op
        return;
      }

      try {
        const tripRef = this.db.collection('trips').doc(String(tripId));
        await tripRef.set({
          currentLocation: {
            lat: locationData.lat,
            lng: locationData.lng,
            heading: locationData.heading || 0,
            speed: locationData.speed || 60,
            landmark: locationData.landmark || ''
          },
          distanceRemainingKm: locationData.distanceRemainingKm,
          etaMinutes: locationData.etaMinutes,
          isLocationPaused: Boolean(locationData.isLocationPaused),
          updatedAt: global.firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.error(`[Saarthi Firebase] Failed to sync location for trip ${tripId}:`, err);
      }
    }

    /**
     * Driver updates overall trip lifecycle status
     */
    async updateTripStatus(tripId, status, extraFields = {}) {
      if (!this.isInitialized || !this.db) return;

      try {
        const tripRef = this.db.collection('trips').doc(String(tripId));
        await tripRef.set({
          status,
          ...extraFields,
          updatedAt: global.firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.error(`[Saarthi Firebase] Failed to update status for trip ${tripId}:`, err);
      }
    }

    /**
     * Passenger or Driver attaches real-time snapshot listener
     */
    listenToTrip(tripId, onUpdate) {
      if (!this.isInitialized || !this.db) return null;

      const tripRef = this.db.collection('trips').doc(String(tripId));
      const unsubscribe = tripRef.onSnapshot((doc) => {
        if (doc.exists && typeof onUpdate === 'function') {
          onUpdate(doc.data());
        }
      }, (err) => {
        console.warn(`[Saarthi Firebase] Listener error for trip ${tripId}:`, err);
      });

      this.activeListeners.set(tripId, unsubscribe);
      return unsubscribe;
    }

    /**
     * Detach listener
     */
    stopListening(tripId) {
      if (this.activeListeners.has(tripId)) {
        const unsubscribe = this.activeListeners.get(tripId);
        if (typeof unsubscribe === 'function') unsubscribe();
        this.activeListeners.delete(tripId);
      }
    }
  }

  // Export to global scope
  global.SaarthiFirebaseAdapter = new SaarthiFirebaseAdapter();
})(typeof window !== 'undefined' ? window : this);
