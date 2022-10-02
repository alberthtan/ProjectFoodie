
// import * as firebase from 'firebase';
// import '@firebase/auth';
// import '@firebase/firestore';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-dnvxlxh91-G4XJ2TUhwiSk2hmTDayZI",
  authDomain: "dutchpay-bc4a7.firebaseapp.com",
  databaseURL: "https://dutchpay-bc4a7-default-rtdb.firebaseio.com",
  projectId: "dutchpay-bc4a7",
  storageBucket: "dutchpay-bc4a7.appspot.com",
  messagingSenderId: "991851953359",
  appId: "1:991851953359:web:64b45d5b7075c6133f4bba"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase }