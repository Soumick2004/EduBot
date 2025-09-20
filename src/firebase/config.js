// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQFVuOcwOIEt2jxUadwyVmPZticZfwrL4",
  authDomain: "edubot-32262.firebaseapp.com",
  projectId: "edubot-32262",
  storageBucket: "edubot-32262.firebasestorage.app",
  messagingSenderId: "292226356639",
  appId: "1:292226356639:web:a2d5d99930912978ef19aa",
  measurementId: "G-GX5PQ5PB58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);