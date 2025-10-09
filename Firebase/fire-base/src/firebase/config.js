// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkQULGHDm57wJrGKt1lFln6eZXpT27U8M",
  authDomain: "edya2-jaum.firebaseapp.com",
  projectId: "edya2-jaum",
  storageBucket: "edya2-jaum.firebasestorage.app",
  messagingSenderId: "981415115827",
  appId: "1:981415115827:web:97e5b674e3ba8cf104f746",
  measurementId: "G-P12HHZLZWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const firebaseStorage = getStorage(app)

// Initialize Firebase Auth
const auth = getAuth()

export { app, auth, db, firebaseStorage }
export const googleProvider = new GoogleAuthProvider();