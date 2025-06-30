// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPtNcu2hvtCAkJFPK-OOhiQBbWfJvkqUg",
  authDomain: "ventures-6da83.firebaseapp.com",
  databaseURL: "https://ventures-6da83-default-rtdb.firebaseio.com",
  projectId: "ventures-6da83",
  storageBucket: "ventures-6da83.firebasestorage.app",
  messagingSenderId: "334459792407",
  appId: "1:334459792407:web:6cf370d36f6fc5cc0ec052",
  measurementId: "G-RF6V1Z56T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, analytics };