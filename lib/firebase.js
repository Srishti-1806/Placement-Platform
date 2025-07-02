// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhd7U8U8Y-Bp_50uKv6WZa_mWN-Xek1Mg",
  authDomain: "placement-platform-5d7ec.firebaseapp.com",
  projectId: "placement-platform-5d7ec",
  storageBucket: "placement-platform-5d7ec.firebasestorage.app",
  messagingSenderId: "118933494657",
  appId: "1:118933494657:web:4e1a6ffe4dfc4d08226680"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };