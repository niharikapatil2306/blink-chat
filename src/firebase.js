// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "blinkchat-3f9fc.firebaseapp.com",
  projectId: "blinkchat-3f9fc",
  storageBucket: "blinkchat-3f9fc.appspot.com",
  messagingSenderId: "1054947155193",
  appId: "1:1054947155193:web:5022a99a6ceddc11c8d628",
  measurementId: "G-RQC84ET30K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);