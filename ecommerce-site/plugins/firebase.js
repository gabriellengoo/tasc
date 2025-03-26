// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdQc05KC8wDk25mSWQV9e1JDrQeBmmc_0",
  authDomain: "tasc-54cdc.firebaseapp.com",
  projectId: "tasc-54cdc",
  storageBucket: "tasc-54cdc.firebasestorage.app",
  messagingSenderId: "847383439468",
  appId: "1:847383439468:web:7a2772b125891814051049",
  measurementId: "G-93EKXVEBC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);