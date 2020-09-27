import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA9ASV14LvZSKONODCk8SF_KqIChFp2ZdE",
  authDomain: "expense-tracker-11f30.firebaseapp.com",
  databaseURL: "https://expense-tracker-11f30.firebaseio.com",
  projectId: "expense-tracker-11f30",
  storageBucket: "expense-tracker-11f30.appspot.com",
  messagingSenderId: "993508595325",
  appId: "1:993508595325:web:f6c3ea08c61596885b4314",
  measurementId: "G-8E1JEX37VX",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
