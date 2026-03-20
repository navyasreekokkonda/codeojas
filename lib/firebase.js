// lib/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ ADD THIS

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC3I3TqkqvL4biyrp__5sLJZg9ZhVr8-pM",
  authDomain: "codeojas-f50c6.firebaseapp.com",
  projectId: "codeojas-f50c6",
  storageBucket: "codeojas-f50c6.firebasestorage.app",
  messagingSenderId: "911229222220",
  appId: "1:911229222220:web:3231aa53350778030723e9",
  measurementId: "G-6KVV17RZD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ CREATE DATABASE
const db = getFirestore(app);

// ✅ EXPORT DATABASE (VERY IMPORTANT)
export { db };