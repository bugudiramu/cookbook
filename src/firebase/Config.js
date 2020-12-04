import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyClF1XxwzB2Emsln_3tQeV15T6e7pOYhuA',
  authDomain: 'cookbook-e7177.firebaseapp.com',
  projectId: 'cookbook-e7177',
  storageBucket: 'cookbook-e7177.appspot.com',
  messagingSenderId: '904193262232',
  appId: '1:904193262232:web:c0725b3f9baf0cb8e586ed',
  measurementId: 'G-S503FGS9Z2',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase, firebaseConfig };
