var firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyBofCnUNTqJrnIOsMad1zf7QenW3KvJqK4",
    authDomain: "proyectotienda-b3360.firebaseapp.com",
    databaseURL: "https://proyectotienda-b3360-default-rtdb.firebaseio.com",
    projectId: "proyectotienda-b3360",
    storageBucket: "proyectotienda-b3360.appspot.com",
    messagingSenderId: "557484940364",
    appId: "1:557484940364:web:13b3af065618841396e8e9"
  };
  
  firebase.initializeApp(firebaseConfig)
  let database = firebase.firestore();
  const users = database.collection("usuarios");

module.exports = users;