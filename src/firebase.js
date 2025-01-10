import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDm0biputNNaS6olFyh2D_aPs13qCDo_KM",
    authDomain: "poll-app-5f87d.firebaseapp.com",
    projectId: "poll-app-5f87d",
    storageBucket: "poll-app-5f87d.firebasestorage.app",
    messagingSenderId: "301300541979",
    appId: "1:301300541979:web:9e16b6cc4f42320dad26be",
    measurementId: "G-G0TM4R7RR0"
  };


  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);
const auth = getAuth(app);

export { db, functions, auth };
