// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
impoty { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUXKYg5BIgR8hn-rQHBLnKGw5QurNlMiU",
  authDomain: "hojanote-8dbeb.firebaseapp.com",
  projectId: "hojanote-8dbeb",
  storageBucket: "hojanote-8dbeb.firebasestorage.app",
  messagingSenderId: "815983763408",
  appId: "1:815983763408:web:6689130ce939746d8b63d5",
  measurementId: "G-39QG2YZ4Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Aunthentication
export const auth = getAuth(app);

//Initialize Firestore Database
export const db = getFirestore(app);
