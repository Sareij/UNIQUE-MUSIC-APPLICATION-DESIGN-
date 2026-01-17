// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0czIu_sFK2fOAmpXmGIylVLnV_ZnkOjc",
  authDomain: "tech-haven-music-372-79a68.firebaseapp.com",
  projectId: "tech-haven-music-372-79a68",
  storageBucket: "tech-haven-music-372-79a68.firebasestorage.app",
  messagingSenderId: "113435213129",
  appId: "1:113435213129:web:a06b243f009c6b6845ae98"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export let __AUTH = getAuth(firebaseApp);
export let __DB = getFirestore(firebaseApp);

