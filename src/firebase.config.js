// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUKwJCQcFPyc8pG7SkRDhNW4_1xBhx8tU",
  authDomain: "house-marketplace-app-2037d.firebaseapp.com",
  projectId: "house-marketplace-app-2037d",
  storageBucket: "house-marketplace-app-2037d.appspot.com",
  messagingSenderId: "850445153871",
  appId: "1:850445153871:web:93e3bd6ab87c8ae7739c3a"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()