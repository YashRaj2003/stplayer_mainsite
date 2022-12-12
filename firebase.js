import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCTaBTEXPk9Ax44eCkiC4RainTLJcPHzdo",
    authDomain: "stplayer-lpu.firebaseapp.com",
    projectId: "stplayer-lpu",
    storageBucket: "stplayer-lpu.appspot.com",
    messagingSenderId: "996242174539",
    appId: "1:996242174539:web:d705205fd74fd4ebbe93ce"
};
// Initialize Firebase
var fb = initializeApp(firebaseConfig);

const auth = getAuth();
let db = getFirestore();
let storage = getStorage();

export { auth, db, storage, fb };
