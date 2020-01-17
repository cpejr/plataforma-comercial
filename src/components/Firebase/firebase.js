import * as firebase from 'firebase/app'
import 'firebase/auth'
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

console.log(process.env.REACT_APP_NODE_ENV);
console.log(process.env.REACT_APP_MONGO_USER);
console.log(process.env.REACT_APP_FIREBASE_API_KEY);
console.log(process.env.REACT_APP_API_URL);

const appFirebase = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  });

  export default appFirebase;