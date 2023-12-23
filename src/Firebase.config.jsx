// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqX_ZqAompNqnfV9eLy7n1FsXPZOWDlJQ",
  authDomain: "mycongotaxi.firebaseapp.com",
  projectId: "mycongotaxi",
  storageBucket: "mycongotaxi.appspot.com",
  messagingSenderId: "242128954600",
  appId: "1:242128954600:web:dd1722f5f98b04a7de155d",
  measurementId: "G-8WGDQ071V0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app)