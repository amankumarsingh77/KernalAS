import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBz64qN7jdABvlSMgCwNBXQotodXxpB9h4",
    authDomain: "kernelas-29118.firebaseapp.com",
    projectId: "kernelas-29118",
    storageBucket: "kernelas-29118.appspot.com",
    messagingSenderId: "181315471535",
    appId: "1:181315471535:web:6cc5f12d93ab925c49ec5a",
    measurementId: "G-DGJMVLCMCE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


