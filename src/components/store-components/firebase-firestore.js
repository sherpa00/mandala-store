// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYI1YfEuyG0S4QDJKl5wpaIYYoAKB2Sck",
  authDomain: "mandala-store-bf8bc.firebaseapp.com",
  projectId: "mandala-store-bf8bc",
  storageBucket: "mandala-store-bf8bc.appspot.com",
  messagingSenderId: "490495953314",
  appId: "1:490495953314:web:c8fbbff74f609991fdcafb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;