import firebase from "firebase";



const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyBtd_4gHE3ytS2_CdqK1AQwZ3uRJkhcFQc",
        authDomain: "instagram-clone-9e52b.firebaseapp.com",
        databaseURL: "https://instagram-clone-9e52b-default-rtdb.firebaseio.com",
        projectId: "instagram-clone-9e52b",
        storageBucket: "instagram-clone-9e52b.appspot.com",
        messagingSenderId: "253026363847",
        appId: "1:253026363847:web:2a52841c82dfb735e9d1e2",
        measurementId: "G-WWY8D4LN8M"
      }
);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { db, auth, storage, timestamp};

