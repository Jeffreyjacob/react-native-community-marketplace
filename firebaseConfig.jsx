import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAsXVK1lkw_PLrv8PT8RFRSNEef_HlWrac",
  authDomain: "marketplace-f7b94.firebaseapp.com",
  projectId: "marketplace-f7b94",
  storageBucket: "marketplace-f7b94.appspot.com",
  messagingSenderId: "341098739963",
  appId: "1:341098739963:web:59f8fae35c213b2261985e",
  measurementId: "G-SPDL1EBQZW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export {db,firebaseConfig}