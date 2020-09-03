importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
 apiKey: "AIzaSyA27WNz5rvyv38bdC9tyVaX-ECJRmIoQzI",
  authDomain: "pushnotification-10238.firebaseapp.com",
  databaseURL: "https://pushnotification-10238.firebaseio.com",
  projectId: "pushnotification-10238",
  storageBucket: "pushnotification-10238.appspot.com",
  messagingSenderId: "515799431201",
  appId: "1:515799431201:web:125eaebed96f754abe4b60",
  measurementId: "G-G00L0P6FE2"
});
const messaging = firebase.messaging();

