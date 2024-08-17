// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdVDMMVDg5H9SRDiXeO11vkljt34UTU50",
  authDomain: "flashcardsaas-6f679.firebaseapp.com",
  projectId: "flashcardsaas-6f679",
  storageBucket: "flashcardsaas-6f679.appspot.com",
  messagingSenderId: "16821420397",
  appId: "1:16821420397:web:a0f49080c3e31912e11a64",
  measurementId: "G-HMFPNN168H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}