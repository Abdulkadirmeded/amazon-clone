// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8SUGA77Vkmg5OJYRSsv9NlWAujZa9G9E",
  authDomain: "clone-56da9.firebaseapp.com",
  projectId: "clone-56da9",
  storageBucket: "clone-56da9.firebasestorage.app",
  messagingSenderId: "517472768200",
  appId: "1:517472768200:web:8d35affc46dcdf7848d5fd",
  measurementId: "G-3TYMQBBM2J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig
