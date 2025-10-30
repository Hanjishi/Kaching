// services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq9abTLeEQ5c-scXfhP0mwU-4PVxJn9ls",
  authDomain: "expense-tracker-85257.firebaseapp.com",
  projectId: "expense-tracker-85257",
  storageBucket: "expense-tracker-85257.firebasestorage.app",
  messagingSenderId: "97836606213",
  appId: "1:97836606213:web:d430c2b692c166cfb74d6c",
  measurementId: "G-NWVLNKYTH0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
