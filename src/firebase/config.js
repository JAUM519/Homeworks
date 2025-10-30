// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMkC7xuriZODgqfRLiWiKFUyd39XKJuVs",
  authDomain: "edya2-15b7d.firebaseapp.com",
  projectId: "edya2-15b7d",
  storageBucket: "edya2-15b7d.firebasestorage.app",
  messagingSenderId: "267337131709",
  appId: "1:267337131709:web:3c8c1144b6e2668904f9d4",
  measurementId: "G-3MR7BVTVN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const rtdb = getDatabase(app)

export { app, rtdb }