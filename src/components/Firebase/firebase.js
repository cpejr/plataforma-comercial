import * as firebase from 'firebase/app'
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

console.log(process.env.NODE_ENV);
console.log(process.env.MONGO_USER);
console.log(process.env.FIREBASE_API_KEY);
console.log(process.env.REACT_APP_API_URL);

const appFirebase = firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  });

  export default appFirebase;