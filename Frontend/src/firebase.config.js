import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: `${process.env.REACT_APP_apiKey}`,
//   authDomain: `${process.env.REACT_APP_authDomain}`,
//   projectId: `${process.env.REACT_APP_projectId}`,
//   storageBucket: `${process.env.REACT_APP_storageBucket}`,
//   messagingSenderId: `${process.env.REACT_APP_messagingSenderId}`,
//   appId: `${process.env.REACT_APP_appId}`,
//   measurementId: `${process.env.REACT_APP_measurementId}`
// };

const firebaseConfig = {
    apiKey: "AIzaSyByHZgomdk1NFYBQRkonfEARzHmoYcXpKk",
    authDomain: "hawker-bfe83.firebaseapp.com",
    projectId: "hawker-bfe83",
    storageBucket: "hawker-bfe83.appspot.com",
    messagingSenderId: "914965878005",
    appId: "1:914965878005:web:6aacf0275df523a3f121bc",
    measurementId: "G-NJ75LY7R5H"
  };



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
