const firebase = require('firebase');

const config = {
  apiKey: 'AIzaSyCmhtp_LJ-LekrnFD1q0PKXkdjIPoO2LoI',
  authDomain: 'learn-a1605.firebaseapp.com',
  databaseURL: 'https://learn-a1605.firebaseio.com',
  projectId: 'learn-a1605',
  storageBucket: 'learn-a1605.appspot.com',
  messagingSenderId: '602915227720'
};

firebase.initializeApp(config);
const database = firebase.database();

module.exports = database;
