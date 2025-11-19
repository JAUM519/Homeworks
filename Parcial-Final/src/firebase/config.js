// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbmfHO4KtTiTeVe7i7FAKzZjO_CEYiHkI",
    authDomain: "parcial-final-c666d.firebaseapp.com",
    projectId: "parcial-final-c666d",
    storageBucket: "parcial-final-c666d.firebasestorage.app",
    messagingSenderId: "516341269680",
    appId: "1:516341269680:web:e8176d6d96794532922775"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };