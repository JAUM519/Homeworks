import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCX2m9N-eJJabDtw3eW9R5SHXAvM9fnK5E",
  authDomain: "parcial-2-8b7fc.firebaseapp.com",
  projectId: "parcial-2-8b7fc",
  storageBucket: "parcial-2-8b7fc.firebasestorage.app",
  messagingSenderId: "821959260553",
  appId: "1:821959260553:web:60a05f0126a7426b140958",
  measurementId: "G-QBPXE3SF6W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
const db = getFirestore(app);
const listenAuth = (cb) => onAuthStateChanged(auth, cb);

export { app, auth, db, listenAuth };
