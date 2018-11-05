import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const API_MSID = process.env.REACT_APP_FIREBASE_SENDER_ID;

// Initialize Firebase
var config = {
    apiKey: `${API_KEY}`,
    authDomain: "foodweekly-ad619.firebaseapp.com",
    databaseURL: "https://foodweekly-ad619.firebaseio.com",
    projectId: "foodweekly-ad619",
    storageBucket: "foodweekly-ad619.appspot.com",
    messagingSenderId: API_MSID
  };

  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;