// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);