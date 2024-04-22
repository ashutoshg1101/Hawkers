import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyADFgy3-95164GN-ylbHNVfEkerGh_ihSM",
    authDomain: "assignment-2efc2.firebaseapp.com",
    projectId: "assignment-2efc2",
    storageBucket: "assignment-2efc2.appspot.com",
    messagingSenderId: "515383083360",
    appId: "1:515383083360:web:33eeed051e74dc5b605e05",
    measurementId: "G-4WKH3647Z2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
