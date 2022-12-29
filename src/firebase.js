// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDz5-INkV98hqHiL9KhGMTena38PT-qB6c',
  authDomain: 'foody-react.firebaseapp.com',
  projectId: 'foody-react',
  storageBucket: 'foody-react.appspot.com',
  messagingSenderId: '69674224836',
  appId: '1:69674224836:web:76b7c51caf961a7b274d91',
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getFirestore(app);
