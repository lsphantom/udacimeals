import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBVuc3H_vhAFlZ22IwapfrtI0fb4PAXlwE",
    authDomain: "foodweekly-ad619.firebaseapp.com",
    databaseURL: "https://foodweekly-ad619.firebaseio.com",
    projectId: "foodweekly-ad619",
    storageBucket: "foodweekly-ad619.appspot.com",
    messagingSenderId: "691903576389"
  };

  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;