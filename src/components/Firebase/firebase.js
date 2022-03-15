// import { getAnalytics } from "firebase/analytics";
// import { firebase } from "firebase/app";
// import { initializeApp } from "firebase/app";
// import "firebase/auth";
// import "firebase/database";
// import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS-d39P1x49wjBw6LzT5W9YeHzs_ZbXeg",
  authDomain: "kalambury-v1.firebaseapp.com",
  projectId: "kalambury-v1",
  storageBucket: "kalambury-v1.appspot.com",
  messagingSenderId: "900073744712",
  appId: "1:900073744712:web:01e3bf89c7f520833d6b7d",
  measurementId: "G-BRMMZ8E37H",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

// class Firebase {
//   constructor() {
// firebase.initializeApp(firebaseConfig);

// this.auth = app.auth();
// this.db = firebase.database();
// this.fs = app.firestore();
//   }
// }

// export default Firebase;
