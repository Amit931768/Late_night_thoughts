// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyAFhecsmrZZ6I3X8BVdbDRH5nweFnIr6wA",
  authDomain: "mid-68182.firebaseapp.com",
  projectId: "mid-68182",
  storageBucket: "mid-68182.firebasestorage.app",
  messagingSenderId: "1034829989194",
  appId: "1:1034829989194:web:8b53c5af96a552cae0adb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);