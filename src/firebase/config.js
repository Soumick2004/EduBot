

// config.js
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCQFVuOcwOIEt2jxUadwyVmPZticZfwrL4",           // <-- your Firebase API key
  authDomain: "edubot-32262.firebaseapp.com",
  projectId: "edubot-32262",
  storageBucket: "edubot-32262.firebasestorage.app",
  messagingSenderId: "292226356639",
  appId: "1:292226356639:web:a2d5d99930912978ef19aa"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
