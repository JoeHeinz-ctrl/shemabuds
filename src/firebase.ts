// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7aQhlOGg04GnXsHtZVEaLw-e3XODjS-w",
  authDomain: "shemabuds-9c9fe.firebaseapp.com",
  projectId: "shemabuds-9c9fe",
  storageBucket: "shemabuds-9c9fe.firebasestorage.app",
  messagingSenderId: "353083240007",
  appId: "1:353083240007:web:de1efd4f13c77fc4ac0b62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;