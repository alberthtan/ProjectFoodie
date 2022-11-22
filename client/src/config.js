import firebase from 'firebase/compat/app';  
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyA-dnvxlxh91-G4XJ2TUhwiSk2hmTDayZI",
  authDomain: "dutchpay-bc4a7.firebaseapp.com",
  databaseURL: "https://dutchpay-bc4a7-default-rtdb.firebaseio.com",
  projectId: "dutchpay-bc4a7",
  storageBucket: "dutchpay-bc4a7.appspot.com",
  messagingSenderId: "991851953359",
  appId: "1:991851953359:web:1429447fc830121e3f4bba"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
//   export { firebase }