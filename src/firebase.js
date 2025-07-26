// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAjbR7DpEaqA63ADHt1Q8LOYgAcB-Lk5ms",
  authDomain: "ak90-32fca.firebaseapp.com",
  projectId: "ak90-32fca",
  storageBucket: "ak90-32fca.firebasestorage.app",
  messagingSenderId: "171801654129",
  appId: "1:171801654129:web:1eb9b5d9f7e20309927cd0"
  // If you have a databaseURL, add it here:
  // databaseURL: "https://ak90-32fca-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const rtdb = getDatabase(app);
