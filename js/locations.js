/**
 * SAARTHI 🚗🌱 - SMART LOCATION & INDIA HIERARCHY SYSTEM
 * Standalone Location Provider Module
 * Hierarchy: Country (India) → State → City → Locality
 * Multilingual Support: English (en), Hindi (hi), Marathi (mr)
 */

(function (global) {
  'use strict';

  // ===========================================================================
  // 1. POPULAR SAARTHI HUBS & FREQUENT INTERCITY CORRIDORS
  // ===========================================================================
  const POPULAR_SAARTHI_CITIES = [
    "Pune",
    "Mumbai",
    "Navi Mumbai",
    "Thane",
    "Nagpur",
    "Nashik",
    "Bengaluru",
    "Hyderabad",
    "Ahmedabad",
    "Surat",
    "Goa",
    "Delhi",
    "Gurugram",
    "Noida",
    "Chennai",
    "Jaipur"
  ];

  const POPULAR_SAARTHI_ROUTES = [
    { from: "Pune", to: "Mumbai", availableRidesCount: 42, distanceKm: 152, avgPrice: 650 },
    { from: "Mumbai", to: "Pune", availableRidesCount: 38, distanceKm: 152, avgPrice: 650 },
    { from: "Pune", to: "Nashik", availableRidesCount: 26, distanceKm: 212, avgPrice: 550 },
    { from: "Pune", to: "Nagpur", availableRidesCount: 18, distanceKm: 710, avgPrice: 1450 },
    { from: "Pune", to: "Goa", availableRidesCount: 22, distanceKm: 440, avgPrice: 1100 },
    { from: "Pune", to: "Kolhapur", availableRidesCount: 16, distanceKm: 235, avgPrice: 500 },
    { from: "Mumbai", to: "Nashik", availableRidesCount: 24, distanceKm: 166, avgPrice: 500 },
    { from: "Mumbai", to: "Surat", availableRidesCount: 30, distanceKm: 280, avgPrice: 750 },
    { from: "Mumbai", to: "Goa", availableRidesCount: 19, distanceKm: 580, avgPrice: 1350 },
    { from: "Bengaluru", to: "Chennai", availableRidesCount: 35, distanceKm: 345, avgPrice: 850 },
    { from: "Bengaluru", to: "Hyderabad", availableRidesCount: 31, distanceKm: 570, avgPrice: 1200 },
    { from: "Delhi", to: "Jaipur", availableRidesCount: 38, distanceKm: 275, avgPrice: 600 },
    { from: "Hyderabad", to: "Bengaluru", availableRidesCount: 29, distanceKm: 570, avgPrice: 1200 }
  ];

  // ===========================================================================
  // 2. CANONICAL LOCATION HIERARCHY DATASET
  // ===========================================================================
  const SAARTHI_LOCATIONS = [
    // -------------------------------------------------------------------------
    // MAHARASHTRA: PUNE REGION (Deep Localities Coverage)
    // -------------------------------------------------------------------------
    {
      id: "loc-pune-city",
      name: "Pune",
      translations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      stateTranslations: { en: "Maharashtra", hi: "महाराष्ट्र", mr: "महाराष्ट्र" },
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["pune", "poona", "पुणे", "pun"]
    },
    {
      id: "loc-pune-pcmc",
      name: "Pimpri-Chinchwad",
      translations: { en: "Pimpri-Chinchwad", hi: "पिंपरी-चिंचवड", mr: "पिंपरी-चिंचवड" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      stateTranslations: { en: "Maharashtra", hi: "महाराष्ट्र", mr: "महाराष्ट्र" },
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["pcmc", "pimpri", "chinchwad", "पिंपरी", "चिंचवड"]
    },
    {
      id: "loc-pune-wakad",
      name: "Wakad",
      translations: { en: "Wakad", hi: "वाकड", mr: "वाकड" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["wakad", "वाकड", "pune wakad", "wakad bridge", "wakad pune"]
    },
    {
      id: "loc-pune-hinjewadi",
      name: "Hinjewadi",
      translations: { en: "Hinjewadi", hi: "हिंजवडी", mr: "हिंजवडी" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["hinjewadi", "hinjawadi", "हिंजवडी", "hinjewadi it park", "phase 1", "phase 2", "phase 3"]
    },
    {
      id: "loc-pune-baner",
      name: "Baner",
      translations: { en: "Baner", hi: "बाणेर", mr: "बाणेर" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["baner", "बाणेर", "baner road", "baner highway"]
    },
    {
      id: "loc-pune-balewadi",
      name: "Balewadi",
      translations: { en: "Balewadi", hi: "बालेवाडी", mr: "बालेवाडी" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["balewadi", "बालेवाडी", "balewadi high street", "stadium"]
    },
    {
      id: "loc-pune-kharadi",
      name: "Kharadi",
      translations: { en: "Kharadi", hi: "खराडी", mr: "खराडी" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["kharadi", "खराडी", "eon it park", "world trade center"]
    },
    {
      id: "loc-pune-hadapsar",
      name: "Hadapsar",
      translations: { en: "Hadapsar", hi: "हडपसर", mr: "हडपसर" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["hadapsar", "हडपसर", "hadapsar bypass"]
    },
    {
      id: "loc-pune-viman-nagar",
      name: "Viman Nagar",
      translations: { en: "Viman Nagar", hi: "विमान नगर", mr: "विमान नगर" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["viman nagar", "विमान नगर", "pune airport", "phoenix marketcity"]
    },
    {
      id: "loc-pune-wagholi",
      name: "Wagholi",
      translations: { en: "Wagholi", hi: "वाघोली", mr: "वाघोली" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["wagholi", "वाघोली", "ahmednagar highway"]
    },
    {
      id: "loc-pune-wadgaon-sheri",
      name: "Wadgaon Sheri",
      translations: { en: "Wadgaon Sheri", hi: "वडगाव शेरी", mr: "वडगाव शेरी" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["wadgaon sheri", "wadgaonsheri", "वडगाव शेरी"]
    },
    {
      id: "loc-pune-shivajinagar",
      name: "Shivajinagar",
      translations: { en: "Shivajinagar", hi: "शिवाजीनगर", mr: "शिवाजीनगर" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["shivajinagar", "शिवाजीनगर", "shivaji nagar", "coep"]
    },
    {
      id: "loc-pune-kothrud",
      name: "Kothrud",
      translations: { en: "Kothrud", hi: "कोथरूड", mr: "कोथरूड" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["kothrud", "कोथरूड", "karve road", "paud road", "chandani chowk"]
    },
    {
      id: "loc-pune-aundh",
      name: "Aundh",
      translations: { en: "Aundh", hi: "औंध", mr: "औंध" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["aundh", "औंध", "parihar chowk"]
    },
    {
      id: "loc-pune-yerawada",
      name: "Yerawada",
      translations: { en: "Yerawada", hi: "यरवडा", mr: "येरवडा" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["yerawada", "yerwada", "येरवडा", "यरवडा"]
    },
    {
      id: "loc-pune-swargate",
      name: "Swargate",
      translations: { en: "Swargate", hi: "स्वारगेट", mr: "स्वारगेट" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["swargate", "स्वारगेट", "swargate bus stand"]
    },
    {
      id: "loc-pune-koregaon-park",
      name: "Koregaon Park",
      translations: { en: "Koregaon Park", hi: "कोरेगांव पार्क", mr: "कोरेगाव पार्क" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["koregaon park", "kp", "कोरेगाव पार्क"]
    },
    {
      id: "loc-pune-magarpatta",
      name: "Magarpatta",
      translations: { en: "Magarpatta", hi: "मगरपट्टा", mr: "मगरपट्टा" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["magarpatta", "मगरपट्टा", "magarpatta city", "cybercity"]
    },
    {
      id: "loc-pune-kondhwa",
      name: "Kondhwa",
      translations: { en: "Kondhwa", hi: "कोंढवा", mr: "कोंढवा" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["kondhwa", "कोंढवा", "nibm"]
    },
    {
      id: "loc-pune-pashan",
      name: "Pashan",
      translations: { en: "Pashan", hi: "पाषाण", mr: "पाषाण" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["pashan", "पाषाण", "pashan circle"]
    },
    {
      id: "loc-pune-bavdhan",
      name: "Bavdhan",
      translations: { en: "Bavdhan", hi: "बावधन", mr: "बावधन" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["bavdhan", "बावधन", "chandani chowk bavdhan"]
    },
    {
      id: "loc-pune-warje",
      name: "Warje",
      translations: { en: "Warje", hi: "वारजे", mr: "वारजे" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["warje", "वारजे", "warje bridge", "nh4 flyover", "warje chowk"]
    },
    {
      id: "loc-pune-wanowrie",
      name: "Wanowrie",
      translations: { en: "Wanowrie", hi: "वानवडी", mr: "वानवडी" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["wanowrie", "wanawadi", "वानवडी", "salunke vihar"]
    },
    {
      id: "loc-pune-camp",
      name: "Camp",
      translations: { en: "Camp", hi: "कैंप", mr: "कॅम्प" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["camp", "pune camp", "mg road pune", "कॅम्प"]
    },
    {
      id: "loc-pune-deccan",
      name: "Deccan",
      translations: { en: "Deccan", hi: "डेक्कन", mr: "डेक्कन" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["deccan", "deccan gymkhana", "fc road", "jm road", "डेक्कन"]
    },
    {
      id: "loc-pune-talegaon",
      name: "Talegaon",
      translations: { en: "Talegaon", hi: "तळेगांव", mr: "तळेगाव" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["talegaon", "talegaon dabhade", "तळेगाव"]
    },
    {
      id: "loc-pune-chakan",
      name: "Chakan",
      translations: { en: "Chakan", hi: "चाकण", mr: "चाकण" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["chakan", "चाकण", "chakan midc", "auto cluster"]
    },
    {
      id: "loc-pune-lonavala",
      name: "Lonavala",
      translations: { en: "Lonavala", hi: "लोनावला", mr: "लोणावळा" },
      city: "Pune",
      cityTranslations: { en: "Pune", hi: "पुणे", mr: "पुणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["lonavala", "lonavla", "लोणावळा", "expressway lonavala", "khandala"]
    },

    // -------------------------------------------------------------------------
    // MAHARASHTRA: MUMBAI METROPOLITAN REGION (Deep MMR Localities Coverage)
    // -------------------------------------------------------------------------
    {
      id: "loc-mumbai-city",
      name: "Mumbai",
      translations: { en: "Mumbai", hi: "मुंबई", mr: "मुंबई" },
      city: "Mumbai",
      cityTranslations: { en: "Mumbai", hi: "मुंबई", mr: "मुंबई" },
      state: "Maharashtra",
      stateTranslations: { en: "Maharashtra", hi: "महाराष्ट्र", mr: "महाराष्ट्र" },
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["mumbai", "bombay", "मुंबई", "mum"]
    },
    {
      id: "loc-mumbai-navi-mumbai",
      name: "Navi Mumbai",
      translations: { en: "Navi Mumbai", hi: "नवी मुंबई", mr: "नवी मुंबई" },
      city: "Navi Mumbai",
      cityTranslations: { en: "Navi Mumbai", hi: "नवी मुंबई", mr: "नवी मुंबई" },
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["navi mumbai", "new bombay", "नवी मुंबई", "vashi navi mumbai"]
    },
    {
      id: "loc-mumbai-thane",
      name: "Thane",
      translations: { en: "Thane", hi: "ठाणे", mr: "ठाणे" },
      city: "Thane",
      cityTranslations: { en: "Thane", hi: "ठाणे", mr: "ठाणे" },
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["thane", "thana", "ठाणे", "ghodbunder"]
    },
    {
      id: "loc-mumbai-kalyan",
      name: "Kalyan",
      translations: { en: "Kalyan", hi: "कल्याण", mr: "कल्याण" },
      city: "Thane",
      cityTranslations: { en: "Thane", hi: "ठाणे", mr: "ठाणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["kalyan", "कल्याण", "kalyan junction"]
    },
    {
      id: "loc-mumbai-dombivli",
      name: "Dombivli",
      translations: { en: "Dombivli", hi: "डोंबिवली", mr: "डोंबिवली" },
      city: "Thane",
      cityTranslations: { en: "Thane", hi: "ठाणे", mr: "ठाणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["dombivli", "dombivali", "डोंबिवली"]
    },
    {
      id: "loc-mumbai-vasai",
      name: "Vasai",
      translations: { en: "Vasai", hi: "वसई", mr: "वसई" },
      city: "Palghar",
      cityTranslations: { en: "Palghar", hi: "पालघर", mr: "पालघर" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["vasai", "वसई", "vasai road"]
    },
    {
      id: "loc-mumbai-virar",
      name: "Virar",
      translations: { en: "Virar", hi: "विरार", mr: "विरार" },
      city: "Palghar",
      cityTranslations: { en: "Palghar", hi: "पालघर", mr: "पालघर" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["virar", "विरार"]
    },
    {
      id: "loc-mumbai-mira-road",
      name: "Mira Road",
      translations: { en: "Mira Road", hi: "मीरा रोड", mr: "मीरा रोड" },
      city: "Thane",
      cityTranslations: { en: "Thane", hi: "ठाणे", mr: "ठाणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["mira road", "mira bhayandar", "मीरा रोड"]
    },
    {
      id: "loc-mumbai-bhiwandi",
      name: "Bhiwandi",
      translations: { en: "Bhiwandi", hi: "भिवंडी", mr: "भिवंडी" },
      city: "Thane",
      cityTranslations: { en: "Thane", hi: "ठाणे", mr: "ठाणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["bhiwandi", "भिवंडी", "bhiwandi bypass"]
    },
    {
      id: "loc-mumbai-panvel",
      name: "Panvel",
      translations: { en: "Panvel", hi: "पनवेल", mr: "पनवेल" },
      city: "Navi Mumbai",
      cityTranslations: { en: "Navi Mumbai", hi: "नवी मुंबई", mr: "नवी मुंबई" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["panvel", "पनवेल", "panvel expressway exit", "kalamboli"]
    },
    {
      id: "loc-mumbai-ulhasnagar",
      name: "Ulhasnagar",
      translations: { en: "Ulhasnagar", hi: "उल्हासनगर", mr: "उल्हासनगर" },
      city: "Thane",
      cityTranslations: { en: "Thane", hi: "ठाणे", mr: "ठाणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["ulhasnagar", "उल्हासनगर"]
    },
    {
      id: "loc-mumbai-ambernath",
      name: "Ambernath",
      translations: { en: "Ambernath", hi: "अंबरनाथ", mr: "अंबरनाथ" },
      city: "Thane",
      cityTranslations: { en: "Thane", hi: "ठाणे", mr: "ठाणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["ambernath", "ambarnath", "अंबरनाथ"]
    },
    {
      id: "loc-mumbai-badlapur",
      name: "Badlapur",
      translations: { en: "Badlapur", hi: "बदलापूर", mr: "बदलापूर" },
      city: "Thane",
      cityTranslations: { en: "Thane", hi: "ठाणे", mr: "ठाणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["badlapur", "बदलापूर"]
    },
    {
      id: "loc-mumbai-mumbra",
      name: "Mumbra",
      translations: { en: "Mumbra", hi: "मुंब्रा", mr: "मुंब्रा" },
      city: "Thane",
      cityTranslations: { en: "Thane", hi: "ठाणे", mr: "ठाणे" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["mumbra", "मुंब्रा", "mum"]
    },
    {
      id: "loc-mumbai-mulund",
      name: "Mulund",
      translations: { en: "Mulund", hi: "मुलुंड", mr: "मुलुंड" },
      city: "Mumbai",
      cityTranslations: { en: "Mumbai", hi: "मुंबई", mr: "मुंबई" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["mulund", "मुलुंड", "mulund west", "mulund check naka", "mum"]
    },
    {
      id: "loc-mumbai-borivali",
      name: "Borivali",
      translations: { en: "Borivali", hi: "बोरीवली", mr: "बोरिवली" },
      city: "Mumbai",
      cityTranslations: { en: "Mumbai", hi: "मुंबई", mr: "मुंबई" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["borivali", "borivali west", "borivali east", "national park", "बोरिवली"]
    },
    {
      id: "loc-mumbai-andheri",
      name: "Andheri",
      translations: { en: "Andheri", hi: "अंधेरी", mr: "अंधेरी" },
      city: "Mumbai",
      cityTranslations: { en: "Mumbai", hi: "मुंबई", mr: "मुंबई" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["andheri", "andheri west", "andheri east", "अंधेरी", "we highway"]
    },
    {
      id: "loc-mumbai-bandra",
      name: "Bandra",
      translations: { en: "Bandra", hi: "बांद्रा", mr: "वांद्रे" },
      city: "Mumbai",
      cityTranslations: { en: "Mumbai", hi: "मुंबई", mr: "मुंबई" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["bandra", "bandra west", "bkc", "वांद्रे", "बांद्रा", "ban"]
    },
    {
      id: "loc-mumbai-powai",
      name: "Powai",
      translations: { en: "Powai", hi: "पवई", mr: "पवई" },
      city: "Mumbai",
      cityTranslations: { en: "Mumbai", hi: "मुंबई", mr: "मुंबई" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["powai", "पवई", "hiranandani powai", "iit bombay"]
    },
    {
      id: "loc-mumbai-vashi",
      name: "Vashi",
      translations: { en: "Vashi", hi: "वाशी", mr: "वाशी" },
      city: "Navi Mumbai",
      cityTranslations: { en: "Navi Mumbai", hi: "नवी मुंबई", mr: "नवी मुंबई" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["vashi", "वाशी", "vashi toll naka", "vashi station"]
    },
    {
      id: "loc-mumbai-nerul",
      name: "Nerul",
      translations: { en: "Nerul", hi: "नेरुल", mr: "नेरुळ" },
      city: "Navi Mumbai",
      cityTranslations: { en: "Navi Mumbai", hi: "नवी मुंबई", mr: "नवी मुंबई" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["nerul", "नेरुळ", "lp nerul"]
    },
    {
      id: "loc-mumbai-belapur",
      name: "Belapur",
      translations: { en: "Belapur", hi: "बेलापुर", mr: "बेलापूर" },
      city: "Navi Mumbai",
      cityTranslations: { en: "Navi Mumbai", hi: "नवी मुंबई", mr: "नवी मुंबई" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["belapur", "cbd belapur", "बेलापूर"]
    },
    {
      id: "loc-mumbai-dadar",
      name: "Dadar",
      translations: { en: "Dadar", hi: "दादर", mr: "दादर" },
      city: "Mumbai",
      cityTranslations: { en: "Mumbai", hi: "मुंबई", mr: "मुंबई" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: true,
      aliases: ["dadar", "दादर", "dadar tt circle", "prabhadevi"]
    },
    {
      id: "loc-mumbai-chembur",
      name: "Chembur",
      translations: { en: "Chembur", hi: "चेंबूर", mr: "चेंबूर" },
      city: "Mumbai",
      cityTranslations: { en: "Mumbai", hi: "मुंबई", mr: "मुंबई" },
      state: "Maharashtra",
      country: "India",
      type: "locality",
      isPopular: false,
      aliases: ["chembur", "चेंबूर", "eastern freeway chembur"]
    },

    // -------------------------------------------------------------------------
    // OTHER MAJOR MAHARASHTRA CITIES
    // -------------------------------------------------------------------------
    {
      id: "loc-mh-nagpur",
      name: "Nagpur",
      translations: { en: "Nagpur", hi: "नागपुर", mr: "नागपूर" },
      city: "Nagpur",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["nagpur", "नागपूर", "नागपुर", "samruddhi mahamarg nagpur"]
    },
    {
      id: "loc-mh-nashik",
      name: "Nashik",
      translations: { en: "Nashik", hi: "नासिक", mr: "नाशिक" },
      city: "Nashik",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["nashik", "nasik", "नाशिक", "नासिक"]
    },
    {
      id: "loc-mh-csn",
      name: "Chhatrapati Sambhajinagar",
      translations: { en: "Chhatrapati Sambhajinagar", hi: "छत्रपति संभाजीनगर", mr: "छत्रपती संभाजीनगर" },
      city: "Chhatrapati Sambhajinagar",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["chhatrapati sambhajinagar", "aurangabad", "संभाजीनगर", "औरंगाबाद"]
    },
    {
      id: "loc-mh-kolhapur",
      name: "Kolhapur",
      translations: { en: "Kolhapur", hi: "कोल्हापुर", mr: "कोल्हापूर" },
      city: "Kolhapur",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["kolhapur", "कोल्हापूर", "कोल्हापुर"]
    },
    {
      id: "loc-mh-solapur",
      name: "Solapur",
      translations: { en: "Solapur", hi: "सोलापुर", mr: "सोलापूर" },
      city: "Solapur",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["solapur", "sholapur", "सोलापूर"]
    },
    {
      id: "loc-mh-amravati",
      name: "Amravati",
      translations: { en: "Amravati", hi: "अमरावती", mr: "अमरावती" },
      city: "Amravati",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["amravati", "अमरावती"]
    },
    {
      id: "loc-mh-nanded",
      name: "Nanded",
      translations: { en: "Nanded", hi: "नांदेड़", mr: "नांदेड" },
      city: "Nanded",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["nanded", "नांदेड", "नांदेड़"]
    },
    {
      id: "loc-mh-sangli",
      name: "Sangli",
      translations: { en: "Sangli", hi: "सांगली", mr: "सांगली" },
      city: "Sangli",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["sangli", "सांगली", "miraj"]
    },
    {
      id: "loc-mh-satara",
      name: "Satara",
      translations: { en: "Satara", hi: "सतारा", mr: "सातारा" },
      city: "Satara",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["satara", "सातारा", "सतारा"]
    },
    {
      id: "loc-mh-jalgaon",
      name: "Jalgaon",
      translations: { en: "Jalgaon", hi: "जलगांव", mr: "जळगाव" },
      city: "Jalgaon",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["jalgaon", "जळगाव", "जलगांव"]
    },
    {
      id: "loc-mh-akola",
      name: "Akola",
      translations: { en: "Akola", hi: "अकोला", mr: "अकोला" },
      city: "Akola",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["akola", "अकोला"]
    },
    {
      id: "loc-mh-latur",
      name: "Latur",
      translations: { en: "Latur", hi: "लातूर", mr: "लातूर" },
      city: "Latur",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["latur", "लातूर"]
    },
    {
      id: "loc-mh-ahilyanagar",
      name: "Ahilyanagar",
      translations: { en: "Ahilyanagar", hi: "अहिल्यानगर", mr: "अहिल्यानगर" },
      city: "Ahilyanagar",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["ahilyanagar", "ahmednagar", "अहिल्यानगर", "अहमदनगर"]
    },
    {
      id: "loc-mh-ratnagiri",
      name: "Ratnagiri",
      translations: { en: "Ratnagiri", hi: "रत्नागिरि", mr: "रत्नागिरी" },
      city: "Ratnagiri",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["ratnagiri", "रत्नागिरी", "kokan"]
    },
    {
      id: "loc-mh-dhule",
      name: "Dhule",
      translations: { en: "Dhule", hi: "धुले", mr: "धुळे" },
      city: "Dhule",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["dhule", "धुळे", "धुले"]
    },
    {
      id: "loc-mh-chandrapur",
      name: "Chandrapur",
      translations: { en: "Chandrapur", hi: "चंद्रपुर", mr: "चंद्रपूर" },
      city: "Chandrapur",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["chandrapur", "चंद्रपूर"]
    },
    {
      id: "loc-mh-parbhani",
      name: "Parbhani",
      translations: { en: "Parbhani", hi: "परभनी", mr: "परभणी" },
      city: "Parbhani",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["parbhani", "परभणी"]
    },
    {
      id: "loc-mh-beed",
      name: "Beed",
      translations: { en: "Beed", hi: "बीड", mr: "बीड" },
      city: "Beed",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["beed", "बीड"]
    },
    {
      id: "loc-mh-wardha",
      name: "Wardha",
      translations: { en: "Wardha", hi: "वर्धा", mr: "वर्धा" },
      city: "Wardha",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["wardha", "वर्धा", "sevagram"]
    },
    {
      id: "loc-mh-yavatmal",
      name: "Yavatmal",
      translations: { en: "Yavatmal", hi: "यवतमाल", mr: "यवतमाळ" },
      city: "Yavatmal",
      state: "Maharashtra",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["yavatmal", "यवतमाळ"]
    },

    // -------------------------------------------------------------------------
    // KARNATAKA
    // -------------------------------------------------------------------------
    {
      id: "loc-ka-bengaluru",
      name: "Bengaluru",
      translations: { en: "Bengaluru", hi: "बेंगलुरु", mr: "बंगळुरू" },
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["bengaluru", "bangalore", "बेंगलुरु", "bangalore city", "ban"]
    },
    {
      id: "loc-ka-mysuru",
      name: "Mysuru",
      translations: { en: "Mysuru", hi: "मैसूरु", mr: "म्हैसूर" },
      city: "Mysuru",
      state: "Karnataka",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["mysuru", "mysore", "मैसूर"]
    },
    {
      id: "loc-ka-mangaluru",
      name: "Mangaluru",
      translations: { en: "Mangaluru", hi: "मंगलुरु", mr: "मंगलोर" },
      city: "Mangaluru",
      state: "Karnataka",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["mangaluru", "mangalore", "मंगलुरु"]
    },
    {
      id: "loc-ka-hubballi",
      name: "Hubballi",
      translations: { en: "Hubballi", hi: "हुबली", mr: "हुबळी" },
      city: "Hubballi",
      state: "Karnataka",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["hubballi", "hubli", "हुबली"]
    },
    {
      id: "loc-ka-belagavi",
      name: "Belagavi",
      translations: { en: "Belagavi", hi: "बेलगाम", mr: "बेळगाव" },
      city: "Belagavi",
      state: "Karnataka",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["belagavi", "belgaum", "बेळगाव"]
    },
    {
      id: "loc-ka-dharwad",
      name: "Dharwad",
      translations: { en: "Dharwad", hi: "धारवाड़", mr: "धारवाड" },
      city: "Dharwad",
      state: "Karnataka",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["dharwad", "धारवाड"]
    },
    {
      id: "loc-ka-davanagere",
      name: "Davanagere",
      translations: { en: "Davanagere", hi: "दावणगेरे", mr: "दावणगेरे" },
      city: "Davanagere",
      state: "Karnataka",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["davanagere", "davangere"]
    },
    {
      id: "loc-ka-shivamogga",
      name: "Shivamogga",
      translations: { en: "Shivamogga", hi: "शिमोगा", mr: "शिमोगा" },
      city: "Shivamogga",
      state: "Karnataka",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["shivamogga", "shimoga"]
    },
    {
      id: "loc-ka-ballari",
      name: "Ballari",
      translations: { en: "Ballari", hi: "बेल्लारी", mr: "बेल्लारी" },
      city: "Ballari",
      state: "Karnataka",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["ballari", "bellary"]
    },

    // -------------------------------------------------------------------------
    // GUJARAT
    // -------------------------------------------------------------------------
    {
      id: "loc-gj-ahmedabad",
      name: "Ahmedabad",
      translations: { en: "Ahmedabad", hi: "अहमदाबाद", mr: "अहमदाबाद" },
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["ahmedabad", "amdavad", "अहमदाबाद"]
    },
    {
      id: "loc-gj-surat",
      name: "Surat",
      translations: { en: "Surat", hi: "सूरत", mr: "सूरत" },
      city: "Surat",
      state: "Gujarat",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["surat", "सूरत"]
    },
    {
      id: "loc-gj-vadodara",
      name: "Vadodara",
      translations: { en: "Vadodara", hi: "वडोदरा", mr: "वडोदरा" },
      city: "Vadodara",
      state: "Gujarat",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["vadodara", "baroda", "वडोदरा"]
    },
    {
      id: "loc-gj-rajkot",
      name: "Rajkot",
      translations: { en: "Rajkot", hi: "राजकोट", mr: "राजकोट" },
      city: "Rajkot",
      state: "Gujarat",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["rajkot", "राजकोट"]
    },
    {
      id: "loc-gj-gandhinagar",
      name: "Gandhinagar",
      translations: { en: "Gandhinagar", hi: "गांधीनगर", mr: "गांधीनगर" },
      city: "Gandhinagar",
      state: "Gujarat",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["gandhinagar", "गांधीनगर"]
    },
    {
      id: "loc-gj-bharuch",
      name: "Bharuch",
      translations: { en: "Bharuch", hi: "भरूच", mr: "भरूच" },
      city: "Bharuch",
      state: "Gujarat",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["bharuch", "broach"]
    },
    {
      id: "loc-gj-vapi",
      name: "Vapi",
      translations: { en: "Vapi", hi: "वापी", mr: "वापी" },
      city: "Vapi",
      state: "Gujarat",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["vapi", "वापी"]
    },
    {
      id: "loc-gj-anand",
      name: "Anand",
      translations: { en: "Anand", hi: "आनंद", mr: "आनंद" },
      city: "Anand",
      state: "Gujarat",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["anand", "amul city"]
    },
    {
      id: "loc-gj-bhavnagar",
      name: "Bhavnagar",
      translations: { en: "Bhavnagar", hi: "भावनगर", mr: "भावनगर" },
      city: "Bhavnagar",
      state: "Gujarat",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["bhavnagar", "भावनगर"]
    },

    // -------------------------------------------------------------------------
    // GOA
    // -------------------------------------------------------------------------
    {
      id: "loc-ga-goa",
      name: "Goa",
      translations: { en: "Goa", hi: "गोवा", mr: "गोवा" },
      city: "Goa",
      state: "Goa",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["goa", "गोवा", "north goa", "south goa"]
    },
    {
      id: "loc-ga-panaji",
      name: "Panaji",
      translations: { en: "Panaji", hi: "पणजी", mr: "पणजी" },
      city: "Panaji",
      state: "Goa",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["panaji", "panjim", "पणजी"]
    },
    {
      id: "loc-ga-margao",
      name: "Margao",
      translations: { en: "Margao", hi: "मडगांव", mr: "मडगाव" },
      city: "Margao",
      state: "Goa",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["margao", "madgaon", "मडगाव"]
    },
    {
      id: "loc-ga-vasco",
      name: "Vasco da Gama",
      translations: { en: "Vasco da Gama", hi: "वास्को दा गामा", mr: "वास्को" },
      city: "Vasco da Gama",
      state: "Goa",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["vasco da gama", "vasco"]
    },
    {
      id: "loc-ga-mapusa",
      name: "Mapusa",
      translations: { en: "Mapusa", hi: "मापुसा", mr: "म्हापसा" },
      city: "Mapusa",
      state: "Goa",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["mapusa", "mapsa", "म्हापसा"]
    },

    // -------------------------------------------------------------------------
    // TELANGANA
    // -------------------------------------------------------------------------
    {
      id: "loc-ts-hyderabad",
      name: "Hyderabad",
      translations: { en: "Hyderabad", hi: "हैदराबाद", mr: "हैदराबाद" },
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["hyderabad", "secunderabad", "cyberabad", "हैदराबाद", "hitec city"]
    },
    {
      id: "loc-ts-warangal",
      name: "Warangal",
      translations: { en: "Warangal", hi: "वारंगल", mr: "वारंगळ" },
      city: "Warangal",
      state: "Telangana",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["warangal", "वारंगल"]
    },
    {
      id: "loc-ts-karimnagar",
      name: "Karimnagar",
      translations: { en: "Karimnagar", hi: "करीमनगर", mr: "करीमनगर" },
      city: "Karimnagar",
      state: "Telangana",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["karimnagar"]
    },
    {
      id: "loc-ts-nizamabad",
      name: "Nizamabad",
      translations: { en: "Nizamabad", hi: "निज़ामाबाद", mr: "निझामाबाद" },
      city: "Nizamabad",
      state: "Telangana",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["nizamabad"]
    },

    // -------------------------------------------------------------------------
    // ANDHRA PRADESH
    // -------------------------------------------------------------------------
    {
      id: "loc-ap-visakhapatnam",
      name: "Visakhapatnam",
      translations: { en: "Visakhapatnam", hi: "विशाखापट्टनम", mr: "विशाखापट्टणम" },
      city: "Visakhapatnam",
      state: "Andhra Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["visakhapatnam", "vizag", "विशाखापट्टनम"]
    },
    {
      id: "loc-ap-vijayawada",
      name: "Vijayawada",
      translations: { en: "Vijayawada", hi: "विजयवाड़ा", mr: "विजयवाडा" },
      city: "Vijayawada",
      state: "Andhra Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["vijayawada", "bezawada"]
    },
    {
      id: "loc-ap-tirupati",
      name: "Tirupati",
      translations: { en: "Tirupati", hi: "तिरुपति", mr: "तिरुपती" },
      city: "Tirupati",
      state: "Andhra Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["tirupati", "तिरुपति"]
    },
    {
      id: "loc-ap-guntur",
      name: "Guntur",
      translations: { en: "Guntur", hi: "गुंटूर", mr: "गुंटूर" },
      city: "Guntur",
      state: "Andhra Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["guntur"]
    },
    {
      id: "loc-ap-nellore",
      name: "Nellore",
      translations: { en: "Nellore", hi: "नेल्लोर", mr: "नेल्लोर" },
      city: "Nellore",
      state: "Andhra Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["nellore"]
    },
    {
      id: "loc-ap-kurnool",
      name: "Kurnool",
      translations: { en: "Kurnool", hi: "कर्नूल", mr: "कुर्नूल" },
      city: "Kurnool",
      state: "Andhra Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["kurnool"]
    },

    // -------------------------------------------------------------------------
    // MADHYA PRADESH
    // -------------------------------------------------------------------------
    {
      id: "loc-mp-indore",
      name: "Indore",
      translations: { en: "Indore", hi: "इन्दौर", mr: "इंदूर" },
      city: "Indore",
      state: "Madhya Pradesh",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["indore", "इन्दौर", "इंदूर"]
    },
    {
      id: "loc-mp-bhopal",
      name: "Bhopal",
      translations: { en: "Bhopal", hi: "भोपाल", mr: "भोपाळ" },
      city: "Bhopal",
      state: "Madhya Pradesh",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["bhopal", "भोपाल"]
    },
    {
      id: "loc-mp-jabalpur",
      name: "Jabalpur",
      translations: { en: "Jabalpur", hi: "जबलपुर", mr: "जबलपूर" },
      city: "Jabalpur",
      state: "Madhya Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["jabalpur", "जबलपुर"]
    },
    {
      id: "loc-mp-gwalior",
      name: "Gwalior",
      translations: { en: "Gwalior", hi: "ग्वालियर", mr: "ग्वाल्हेर" },
      city: "Gwalior",
      state: "Madhya Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["gwalior", "ग्वालियर"]
    },
    {
      id: "loc-mp-ujjain",
      name: "Ujjain",
      translations: { en: "Ujjain", hi: "उज्जैन", mr: "उज्जैन" },
      city: "Ujjain",
      state: "Madhya Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["ujjain", "mahakal"]
    },
    {
      id: "loc-mp-sagar",
      name: "Sagar",
      translations: { en: "Sagar", hi: "सागर", mr: "सागर" },
      city: "Sagar",
      state: "Madhya Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["sagar"]
    },

    // -------------------------------------------------------------------------
    // RAJASTHAN
    // -------------------------------------------------------------------------
    {
      id: "loc-rj-jaipur",
      name: "Jaipur",
      translations: { en: "Jaipur", hi: "जयपुर", mr: "जयपूर" },
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["jaipur", "pink city", "जयपुर"]
    },
    {
      id: "loc-rj-udaipur",
      name: "Udaipur",
      translations: { en: "Udaipur", hi: "उदयपुर", mr: "उदयपूर" },
      city: "Udaipur",
      state: "Rajasthan",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["udaipur", "lake city", "उदयपुर"]
    },
    {
      id: "loc-rj-jodhpur",
      name: "Jodhpur",
      translations: { en: "Jodhpur", hi: "जोधपुर", mr: "जोधपूर" },
      city: "Jodhpur",
      state: "Rajasthan",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["jodhpur", "blue city", "जोधपुर"]
    },
    {
      id: "loc-rj-kota",
      name: "Kota",
      translations: { en: "Kota", hi: "कोटा", mr: "कोटा" },
      city: "Kota",
      state: "Rajasthan",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["kota", "कोटा"]
    },
    {
      id: "loc-rj-ajmer",
      name: "Ajmer",
      translations: { en: "Ajmer", hi: "अजमेर", mr: "अजमेर" },
      city: "Ajmer",
      state: "Rajasthan",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["ajmer", "pushkar"]
    },

    // -------------------------------------------------------------------------
    // DELHI NCR
    // -------------------------------------------------------------------------
    {
      id: "loc-dl-delhi",
      name: "Delhi",
      translations: { en: "Delhi", hi: "दिल्ली", mr: "दिल्ली" },
      city: "Delhi",
      state: "Delhi",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["delhi", "new delhi", "delhi ncr", "दिल्ली", "नई दिल्ली"]
    },
    {
      id: "loc-dl-new-delhi",
      name: "New Delhi",
      translations: { en: "New Delhi", hi: "नई दिल्ली", mr: "नवी दिल्ली" },
      city: "Delhi",
      state: "Delhi",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["new delhi", "connaught place", "cp"]
    },
    {
      id: "loc-hr-gurugram",
      name: "Gurugram",
      translations: { en: "Gurugram", hi: "गुरुग्राम", mr: "गुरुग्राम" },
      city: "Gurugram",
      state: "Haryana",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["gurugram", "gurgaon", "गुरुग्राम", "cyber hub"]
    },
    {
      id: "loc-up-noida",
      name: "Noida",
      translations: { en: "Noida", hi: "नोएडा", mr: "नोएडा" },
      city: "Noida",
      state: "Uttar Pradesh",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["noida", "greater noida", "नोएडा"]
    },
    {
      id: "loc-up-ghaziabad",
      name: "Ghaziabad",
      translations: { en: "Ghaziabad", hi: "गाजियाबाद", mr: "गाझियाबाद" },
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["ghaziabad", "गाजियाबाद"]
    },
    {
      id: "loc-hr-faridabad",
      name: "Faridabad",
      translations: { en: "Faridabad", hi: "फरीदाबाद", mr: "फरीदाबाद" },
      city: "Faridabad",
      state: "Haryana",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["faridabad", "फरीदाबाद"]
    },

    // -------------------------------------------------------------------------
    // UTTAR PRADESH
    // -------------------------------------------------------------------------
    {
      id: "loc-up-lucknow",
      name: "Lucknow",
      translations: { en: "Lucknow", hi: "लखनऊ", mr: "लखनौ" },
      city: "Lucknow",
      state: "Uttar Pradesh",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["lucknow", "लखनऊ"]
    },
    {
      id: "loc-up-kanpur",
      name: "Kanpur",
      translations: { en: "Kanpur", hi: "कानपुर", mr: "कानपूर" },
      city: "Kanpur",
      state: "Uttar Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["kanpur", "कानपुर"]
    },
    {
      id: "loc-up-agra",
      name: "Agra",
      translations: { en: "Agra", hi: "आगरा", mr: "आग्रा" },
      city: "Agra",
      state: "Uttar Pradesh",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["agra", "taj mahal", "आगरा"]
    },
    {
      id: "loc-up-varanasi",
      name: "Varanasi",
      translations: { en: "Varanasi", hi: "वाराणसी", mr: "वाराणसी" },
      city: "Varanasi",
      state: "Uttar Pradesh",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["varanasi", "banaras", "kashi", "वाराणसी", "बनारस"]
    },
    {
      id: "loc-up-prayagraj",
      name: "Prayagraj",
      translations: { en: "Prayagraj", hi: "प्रयागराज", mr: "प्रयागराज" },
      city: "Prayagraj",
      state: "Uttar Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["prayagraj", "allahabad", "प्रयागराज"]
    },
    {
      id: "loc-up-meerut",
      name: "Meerut",
      translations: { en: "Meerut", hi: "मेरठ", mr: "मेरठ" },
      city: "Meerut",
      state: "Uttar Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["meerut", "मेरठ"]
    },
    {
      id: "loc-up-gorakhpur",
      name: "Gorakhpur",
      translations: { en: "Gorakhpur", hi: "गोरखपुर", mr: "गोरखपूर" },
      city: "Gorakhpur",
      state: "Uttar Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["gorakhpur"]
    },
    {
      id: "loc-up-mathura",
      name: "Mathura",
      translations: { en: "Mathura", hi: "मथुरा", mr: "मथुरा" },
      city: "Mathura",
      state: "Uttar Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["mathura", "vrindavan"]
    },
    {
      id: "loc-up-bareilly",
      name: "Bareilly",
      translations: { en: "Bareilly", hi: "बरेली", mr: "बरेली" },
      city: "Bareilly",
      state: "Uttar Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["bareilly"]
    },

    // -------------------------------------------------------------------------
    // TAMIL NADU
    // -------------------------------------------------------------------------
    {
      id: "loc-tn-chennai",
      name: "Chennai",
      translations: { en: "Chennai", hi: "चेन्नई", mr: "चेन्नई" },
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["chennai", "madras", "चेन्नई"]
    },
    {
      id: "loc-tn-coimbatore",
      name: "Coimbatore",
      translations: { en: "Coimbatore", hi: "कोयंबटूर", mr: "कोइम्बतूर" },
      city: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["coimbatore", "kovai"]
    },
    {
      id: "loc-tn-madurai",
      name: "Madurai",
      translations: { en: "Madurai", hi: "मदुरै", mr: "मदुराई" },
      city: "Madurai",
      state: "Tamil Nadu",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["madurai"]
    },
    {
      id: "loc-tn-salem",
      name: "Salem",
      translations: { en: "Salem", hi: "सेलम", mr: "सेलम" },
      city: "Salem",
      state: "Tamil Nadu",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["salem"]
    },
    {
      id: "loc-tn-trichy",
      name: "Tiruchirappalli",
      translations: { en: "Tiruchirappalli", hi: "तिरुचिरापल्ली", mr: "तिरुचिरापल्ली" },
      city: "Tiruchirappalli",
      state: "Tamil Nadu",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["tiruchirappalli", "trichy"]
    },
    {
      id: "loc-tn-tiruppur",
      name: "Tiruppur",
      translations: { en: "Tiruppur", hi: "तिरुपूर", mr: "तिरुपूर" },
      city: "Tiruppur",
      state: "Tamil Nadu",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["tiruppur"]
    },
    {
      id: "loc-tn-vellore",
      name: "Vellore",
      translations: { en: "Vellore", hi: "वेल्लोर", mr: "वेल्लोर" },
      city: "Vellore",
      state: "Tamil Nadu",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["vellore"]
    },
    {
      id: "loc-tn-erode",
      name: "Erode",
      translations: { en: "Erode", hi: "ईरोड", mr: "इरोड" },
      city: "Erode",
      state: "Tamil Nadu",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["erode"]
    },

    // -------------------------------------------------------------------------
    // KERALA
    // -------------------------------------------------------------------------
    {
      id: "loc-kl-kochi",
      name: "Kochi",
      translations: { en: "Kochi", hi: "कोच्चि", mr: "कोची" },
      city: "Kochi",
      state: "Kerala",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["kochi", "cochin", "ernakulam", "कोच्चि"]
    },
    {
      id: "loc-kl-tvm",
      name: "Thiruvananthapuram",
      translations: { en: "Thiruvananthapuram", hi: "तिरुवनंतपुरम", mr: "तिरुवनंतपुरम" },
      city: "Thiruvananthapuram",
      state: "Kerala",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["thiruvananthapuram", "trivandrum"]
    },
    {
      id: "loc-kl-kozhikode",
      name: "Kozhikode",
      translations: { en: "Kozhikode", hi: "कोझिकोड", mr: "कोझिकोड" },
      city: "Kozhikode",
      state: "Kerala",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["kozhikode", "calicut"]
    },
    {
      id: "loc-kl-thrissur",
      name: "Thrissur",
      translations: { en: "Thrissur", hi: "त्रिशूर", mr: "त्रिशूर" },
      city: "Thrissur",
      state: "Kerala",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["thrissur", "trichur"]
    },
    {
      id: "loc-kl-kollam",
      name: "Kollam",
      translations: { en: "Kollam", hi: "कोल्लम", mr: "कोल्लम" },
      city: "Kollam",
      state: "Kerala",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["kollam", "quilon"]
    },
    {
      id: "loc-kl-kannur",
      name: "Kannur",
      translations: { en: "Kannur", hi: "कन्नूर", mr: "कन्नूर" },
      city: "Kannur",
      state: "Kerala",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["kannur", "cannanore"]
    },

    // -------------------------------------------------------------------------
    // WEST BENGAL
    // -------------------------------------------------------------------------
    {
      id: "loc-wb-kolkata",
      name: "Kolkata",
      translations: { en: "Kolkata", hi: "कोलकाता", mr: "कोलकाता" },
      city: "Kolkata",
      state: "West Bengal",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["kolkata", "calcutta", "कोलकाता"]
    },
    {
      id: "loc-wb-siliguri",
      name: "Siliguri",
      translations: { en: "Siliguri", hi: "सिलीगुड़ी", mr: "सिलिगुडी" },
      city: "Siliguri",
      state: "West Bengal",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["siliguri", "darjeeling route"]
    },
    {
      id: "loc-wb-durgapur",
      name: "Durgapur",
      translations: { en: "Durgapur", hi: "दुर्गापुर", mr: "दुर्गापूर" },
      city: "Durgapur",
      state: "West Bengal",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["durgapur"]
    },
    {
      id: "loc-wb-asansol",
      name: "Asansol",
      translations: { en: "Asansol", hi: "आसनसोल", mr: "आसनसोल" },
      city: "Asansol",
      state: "West Bengal",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["asansol"]
    },

    // -------------------------------------------------------------------------
    // ODISHA
    // -------------------------------------------------------------------------
    {
      id: "loc-or-bhubaneswar",
      name: "Bhubaneswar",
      translations: { en: "Bhubaneswar", hi: "भुवनेश्वर", mr: "भुवनेश्वर" },
      city: "Bhubaneswar",
      state: "Odisha",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["bhubaneswar", "bhubaneshwar", "भुवनेश्वर"]
    },
    {
      id: "loc-or-cuttack",
      name: "Cuttack",
      translations: { en: "Cuttack", hi: "कटक", mr: "कटक" },
      city: "Cuttack",
      state: "Odisha",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["cuttack", "कटक"]
    },
    {
      id: "loc-or-rourkela",
      name: "Rourkela",
      translations: { en: "Rourkela", hi: "राउरकेला", mr: "राउरकेला" },
      city: "Rourkela",
      state: "Odisha",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["rourkela"]
    },
    {
      id: "loc-or-puri",
      name: "Puri",
      translations: { en: "Puri", hi: "पुरी", mr: "पुरी" },
      city: "Puri",
      state: "Odisha",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["puri", "jagannath puri"]
    },

    // -------------------------------------------------------------------------
    // PUNJAB / HARYANA / CHANDIGARH
    // -------------------------------------------------------------------------
    {
      id: "loc-ch-chandigarh",
      name: "Chandigarh",
      translations: { en: "Chandigarh", hi: "चंडीगढ़", mr: "चंदिगढ" },
      city: "Chandigarh",
      state: "Chandigarh",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["chandigarh", "चंडीगढ़", "mohali", "panchkula", "tricity"]
    },
    {
      id: "loc-pb-amritsar",
      name: "Amritsar",
      translations: { en: "Amritsar", hi: "अमृतसर", mr: "अमृतसर" },
      city: "Amritsar",
      state: "Punjab",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["amritsar", "golden temple", "अमृतसर"]
    },
    {
      id: "loc-pb-ludhiana",
      name: "Ludhiana",
      translations: { en: "Ludhiana", hi: "लुधियाना", mr: "लुधियाना" },
      city: "Ludhiana",
      state: "Punjab",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["ludhiana"]
    },
    {
      id: "loc-pb-jalandhar",
      name: "Jalandhar",
      translations: { en: "Jalandhar", hi: "जालंधर", mr: "जालंधर" },
      city: "Jalandhar",
      state: "Punjab",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["jalandhar"]
    },
    {
      id: "loc-pb-patiala",
      name: "Patiala",
      translations: { en: "Patiala", hi: "पटियाला", mr: "पटियाला" },
      city: "Patiala",
      state: "Punjab",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["patiala"]
    },
    {
      id: "loc-hr-ambala",
      name: "Ambala",
      translations: { en: "Ambala", hi: "अंबाला", mr: "अंबाला" },
      city: "Ambala",
      state: "Haryana",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["ambala", "ambala cantt"]
    },
    {
      id: "loc-hr-panipat",
      name: "Panipat",
      translations: { en: "Panipat", hi: "पानीपत", mr: "पानिपत" },
      city: "Panipat",
      state: "Haryana",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["panipat", "पानीपत"]
    },
    {
      id: "loc-hr-karnal",
      name: "Karnal",
      translations: { en: "Karnal", hi: "करनाल", mr: "कर्नाल" },
      city: "Karnal",
      state: "Haryana",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["karnal"]
    },
    {
      id: "loc-hr-hisar",
      name: "Hisar",
      translations: { en: "Hisar", hi: "हिसार", mr: "हिसार" },
      city: "Hisar",
      state: "Haryana",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["hisar", "hissar"]
    },

    // -------------------------------------------------------------------------
    // BIHAR / JHARKHAND
    // -------------------------------------------------------------------------
    {
      id: "loc-br-patna",
      name: "Patna",
      translations: { en: "Patna", hi: "पटना", mr: "पाटणा" },
      city: "Patna",
      state: "Bihar",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["patna", "पटना"]
    },
    {
      id: "loc-br-gaya",
      name: "Gaya",
      translations: { en: "Gaya", hi: "गया", mr: "गया" },
      city: "Gaya",
      state: "Bihar",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["gaya", "bodh gaya"]
    },
    {
      id: "loc-br-muzaffarpur",
      name: "Muzaffarpur",
      translations: { en: "Muzaffarpur", hi: "मुज़फ़्फ़रपुर", mr: "मुझफ्फरपूर" },
      city: "Muzaffarpur",
      state: "Bihar",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["muzaffarpur"]
    },
    {
      id: "loc-jh-ranchi",
      name: "Ranchi",
      translations: { en: "Ranchi", hi: "राँची", mr: "रांची" },
      city: "Ranchi",
      state: "Jharkhand",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["ranchi", "राँची"]
    },
    {
      id: "loc-jh-jamshedpur",
      name: "Jamshedpur",
      translations: { en: "Jamshedpur", hi: "जमशेदपुर", mr: "जमशेदपूर" },
      city: "Jamshedpur",
      state: "Jharkhand",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["jamshedpur", "tatanagar"]
    },
    {
      id: "loc-jh-dhanbad",
      name: "Dhanbad",
      translations: { en: "Dhanbad", hi: "धनबाद", mr: "धनबाद" },
      city: "Dhanbad",
      state: "Jharkhand",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["dhanbad"]
    },

    // -------------------------------------------------------------------------
    // CHHATTISGARH
    // -------------------------------------------------------------------------
    {
      id: "loc-cg-raipur",
      name: "Raipur",
      translations: { en: "Raipur", hi: "रायपुर", mr: "रायपूर" },
      city: "Raipur",
      state: "Chhattisgarh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["raipur", "रायपुर"]
    },
    {
      id: "loc-cg-bhilai",
      name: "Bhilai",
      translations: { en: "Bhilai", hi: "भिलाई", mr: "भिलाई" },
      city: "Bhilai",
      state: "Chhattisgarh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["bhilai", "durg bhilai"]
    },
    {
      id: "loc-cg-bilaspur",
      name: "Bilaspur",
      translations: { en: "Bilaspur", hi: "बिलासपुर", mr: "बिलासपूर" },
      city: "Bilaspur",
      state: "Chhattisgarh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["bilaspur"]
    },

    // -------------------------------------------------------------------------
    // UTTARAKHAND
    // -------------------------------------------------------------------------
    {
      id: "loc-uk-dehradun",
      name: "Dehradun",
      translations: { en: "Dehradun", hi: "देहरादून", mr: "डेहराडून" },
      city: "Dehradun",
      state: "Uttarakhand",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["dehradun", "देहरादून", "mussoorie route"]
    },
    {
      id: "loc-uk-haridwar",
      name: "Haridwar",
      translations: { en: "Haridwar", hi: "हरिद्वार", mr: "हरिद्वार" },
      city: "Haridwar",
      state: "Uttarakhand",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["haridwar", "hardwar", "हरिद्वार"]
    },
    {
      id: "loc-uk-rishikesh",
      name: "Rishikesh",
      translations: { en: "Rishikesh", hi: "ऋषिकेश", mr: "ऋषिकेश" },
      city: "Rishikesh",
      state: "Uttarakhand",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["rishikesh", "ऋषिकेश"]
    },
    {
      id: "loc-uk-roorkee",
      name: "Roorkee",
      translations: { en: "Roorkee", hi: "रुड़की", mr: "रुरकी" },
      city: "Roorkee",
      state: "Uttarakhand",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["roorkee", "iit roorkee"]
    },

    // -------------------------------------------------------------------------
    // HIMACHAL PRADESH
    // -------------------------------------------------------------------------
    {
      id: "loc-hp-shimla",
      name: "Shimla",
      translations: { en: "Shimla", hi: "शिमला", mr: "शिमला" },
      city: "Shimla",
      state: "Himachal Pradesh",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["shimla", "simla", "शिमला"]
    },
    {
      id: "loc-hp-manali",
      name: "Manali",
      translations: { en: "Manali", hi: "मनाली", mr: "मनाली" },
      city: "Manali",
      state: "Himachal Pradesh",
      country: "India",
      type: "city",
      isPopular: true,
      aliases: ["manali", "kullu manali", "मनाली"]
    },
    {
      id: "loc-hp-dharamshala",
      name: "Dharamshala",
      translations: { en: "Dharamshala", hi: "धर्मशाला", mr: "धर्मशाळा" },
      city: "Dharamshala",
      state: "Himachal Pradesh",
      country: "India",
      type: "city",
      isPopular: false,
      aliases: ["dharamshala", "mcleodganj", "धर्मशाला"]
    }
  ];

  // ===========================================================================
  // 3. LOCATION NORMALIZER & HELPER UTILITIES
  // ===========================================================================
  const LocationNormalizer = {
    normalize(text) {
      if (!text || typeof text !== 'string') return '';
      return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    }
  };

  // ===========================================================================
  // 4. SMART LOCATION PROVIDER (Extensible / API-Ready Architecture)
  // ===========================================================================
  const LocationProvider = {
    /**
     * Search locations matching the query across English, Hindi, and Marathi
     * Applies 6-Tier Smart Ranking
     * @param {string} rawQuery - The user input string
     * @param {Object} options - { currentLang: 'en', limit: 7, userCity: 'Pune' }
     * @returns {Array<Object>} Sorted list of matching location objects with match metadata
     */
    search(rawQuery, options = {}) {
      const query = LocationNormalizer.normalize(rawQuery);
      if (!query || query.length < 1) return [];

      const limit = typeof options === 'object' && options.limit ? options.limit : 8;
      const lang = typeof options === 'string' ? options : (options.currentLang || 'en');

      const scoredMatches = [];

      for (const loc of SAARTHI_LOCATIONS) {
        const score = this._calculateLocationMatchScore(loc, query, lang);
        if (score > 0) {
          scoredMatches.push({
            ...loc,
            location: loc,
            score: score,
            displayName: (loc.translations && loc.translations[lang]) || loc.name,
            displayCity: (loc.cityTranslations && loc.cityTranslations[lang]) || loc.city,
            displayState: (loc.stateTranslations && loc.stateTranslations[lang]) || loc.state
          });
        }
      }

      // Sort by score descending
      scoredMatches.sort((a, b) => b.score - a.score);

      return scoredMatches.slice(0, limit);
    },

    /**
     * 6-Tier Scoring Engine
     * Tier 1: Exact match on name or translation (1000 pts)
     * Tier 2: Word starts with query (500 pts)
     * Tier 3: Major / Popular city boost (200 pts)
     * Tier 4: Locality match (100 pts)
     * Tier 5: Substring match (50 pts)
     * Tier 6: State match (20 pts)
     */
    _calculateLocationMatchScore(loc, query, lang) {
      const nameNorm = LocationNormalizer.normalize(loc.name);
      const enNorm = LocationNormalizer.normalize((loc.translations && loc.translations.en) || '');
      const hiNorm = LocationNormalizer.normalize((loc.translations && loc.translations.hi) || '');
      const mrNorm = LocationNormalizer.normalize((loc.translations && loc.translations.mr) || '');
      const cityNorm = LocationNormalizer.normalize(loc.city);
      const stateNorm = LocationNormalizer.normalize(loc.state);

      const primaryTokens = [nameNorm, enNorm, hiNorm, mrNorm];
      const aliasTokens = (loc.aliases || []).map(a => LocationNormalizer.normalize(a));

      let score = 0;

      // 1. Exact match on primary name or direct translation
      for (const token of primaryTokens) {
        if (token && token === query) {
          score = Math.max(score, 1000);
          break;
        }
      }

      // 2. Exact match on alias
      if (score === 0) {
        for (const token of aliasTokens) {
          if (token && token === query) {
            score = Math.max(score, 800);
            break;
          }
        }
      }

      // 3. Starts with on primary name
      if (score === 0) {
        for (const token of primaryTokens) {
          if (token && token.startsWith(query)) {
            score = Math.max(score, 600);
            break;
          }
          if (token) {
            const words = token.split(' ');
            for (const w of words) {
              if (w.startsWith(query)) {
                score = Math.max(score, 450);
                break;
              }
            }
          }
        }
      }

      // 4. Primary name substring match
      if (score === 0) {
        for (const token of primaryTokens) {
          if (token && token.includes(query)) {
            score = Math.max(score, 300);
            break;
          }
        }
      }

      // 5. Starts with on alias
      if (score === 0) {
        for (const token of aliasTokens) {
          if (token && token.startsWith(query)) {
            score = Math.max(score, 200);
            break;
          }
          if (token) {
            const words = token.split(' ');
            for (const w of words) {
              if (w.startsWith(query)) {
                score = Math.max(score, 150);
                break;
              }
            }
          }
        }
      }

      // 6. Substring in alias (only for queries >= 4 chars to prevent false positives on short prefixes)
      if (score === 0 && query.length >= 4) {
        for (const token of aliasTokens) {
          if (token && token.includes(query)) {
            score = Math.max(score, 60);
            break;
          }
        }
      }

      // 7. City name startsWith
      if (score === 0 && cityNorm && cityNorm.startsWith(query)) {
        score = 120;
      }

      // 8. State name startsWith
      if (score === 0 && stateNorm && (stateNorm.startsWith(query) || stateNorm.includes(query))) {
        score = 50;
      }

      if (score === 0) return 0;

      // Bonus ranking adjustments:
      // Popular Saarthi Hub / Locality priority
      if (loc.isPopular) {
        score += 150;
      }

      // Major city hub priority
      if (POPULAR_SAARTHI_CITIES.includes(loc.name)) {
        score += 100;
      }

      // City type bonus
      if (loc.type === 'city') {
        score += 80;
      }

      // Short distance / concise name bonus
      if (nameNorm.startsWith(query)) {
        score += Math.max(0, 20 - nameNorm.length);
      }

      return score;
    },

    /**
     * Resolve any locality or city name to its canonical city
     * e.g. "Wakad" -> "Pune", "Andheri" -> "Mumbai", "Pune" -> "Pune"
     */
    resolveCanonicalCity(input) {
      if (!input) return "";
      const norm = LocationNormalizer.normalize(input);

      // Direct match
      for (const loc of SAARTHI_LOCATIONS) {
        if (LocationNormalizer.normalize(loc.name) === norm ||
            LocationNormalizer.normalize((loc.translations && loc.translations.en) || '') === norm ||
            LocationNormalizer.normalize((loc.translations && loc.translations.hi) || '') === norm ||
            LocationNormalizer.normalize((loc.translations && loc.translations.mr) || '') === norm ||
            (loc.aliases && loc.aliases.some(a => LocationNormalizer.normalize(a) === norm))) {
          return loc.city;
        }
      }

      // Substring check against locality or city
      for (const loc of SAARTHI_LOCATIONS) {
        if (norm.includes(LocationNormalizer.normalize(loc.name)) ||
            norm.includes(LocationNormalizer.normalize(loc.city))) {
          return loc.city;
        }
      }

      return input;
    },

    /**
     * Check if a given route is a recognized popular route
     */
    findPopularRoute(fromText, toText) {
      if (!fromText || !toText) return null;
      const fromCity = this.resolveCanonicalCity(fromText);
      const toCity = this.resolveCanonicalCity(toText);

      return POPULAR_SAARTHI_ROUTES.find(r =>
        r.from.toLowerCase() === fromCity.toLowerCase() &&
        r.to.toLowerCase() === toCity.toLowerCase()
      ) || null;
    },

    getPopularRoutes() {
      return [...POPULAR_SAARTHI_ROUTES];
    },

    getPopularCities() {
      return [...POPULAR_SAARTHI_CITIES];
    },

    getAllLocations() {
      return [...SAARTHI_LOCATIONS];
    }
  };

  // Expose to window / global scope for app usage
  global.SaarthiLocations = {
    DATA: SAARTHI_LOCATIONS,
    POPULAR_CITIES: POPULAR_SAARTHI_CITIES,
    POPULAR_ROUTES: POPULAR_SAARTHI_ROUTES,
    Normalizer: LocationNormalizer,
    Provider: LocationProvider
  };

})(typeof window !== 'undefined' ? window : globalThis);
