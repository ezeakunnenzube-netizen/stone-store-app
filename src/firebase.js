// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔥 YOUR FIREBASE CONFIG - GET THIS FROM FIREBASE CONSOLE!
// How to get this:
// 1. Go to https://console.firebase.google.com/
// 2. Select your project
// 3. Click the gear icon (⚙️) next to "Project Overview"
// 4. Scroll down to "Your apps"
// 5. If you don't have an app, click "Add app" → Web app (</>)
// 6. Copy the firebaseConfig object and paste it below!
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcTpW2ugSAVi8hoCTaykhsDVfCBN1qapU",
  authDomain: "stone-app-f5011.firebaseapp.com",
  projectId: "stone-app-f5011",
  storageBucket: "stone-app-f5011.firebasestorage.app",
  messagingSenderId: "412013642248",
  appId: "1:412013642248:web:b80bac5d574d8a731c87bd",
  measurementId: "G-57EF6N54R9"
};

// Initialize Firebase — reuse the existing app instance if one already
// exists (this module can be re-evaluated by Vite's dev-mode hot module
// reload, and initializeApp() throws if called twice for the same app).
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore and Auth
// NOTE: Replit's dev/preview environment proxies requests through an iframe,
// which can block Firestore's default WebChannel streaming connection
// ("Could not reach Cloud Firestore backend" timeouts). Auto-detecting long
// polling falls back to plain HTTP requests when streaming isn't available,
// which works reliably behind the proxy without slowing things down when
// streaming *is* available.
// initializeFirestore() throws "failed-precondition" if Firestore was
// already started for this app (e.g. after a hot reload) — fall back to
// getFirestore() in that case to reuse the already-configured instance.
let firestoreDb;
try {
  firestoreDb = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
  });
} catch (err) {
  firestoreDb = getFirestore(app);
}
export const db = firestoreDb;
export const auth = getAuth(app);