import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyIyZhjbGP-80GjuGEHk4L3HOcNeVTTDU",
  authDomain: "polling-53ab5.firebaseapp.com",
  projectId: "polling-53ab5",
  storageBucket: "polling-53ab5.firebasestorage.app",
  messagingSenderId: "297562829880",
  appId: "1:297562829880:web:af38fb756b8a6f6c0022cd",
  measurementId: "G-44YYHZ09MT"
  };


  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);
const auth = getAuth(app);

export { db, functions, auth };
