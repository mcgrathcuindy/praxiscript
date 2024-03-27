// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8yFPo7avspaivEUr1_86qhzr3sNA6oko",
  authDomain: "praxiscript-804dc.firebaseapp.com",
  projectId: "praxiscript-804dc",
  storageBucket: "praxiscript-804dc.appspot.com",
  messagingSenderId: "595876699062",
  appId: "1:595876699062:web:40f72c04c80f88bfe23f17",
  measurementId: "G-PJ0YSJBZ9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);