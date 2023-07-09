import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqHi3WxScpyQXZf5o_C5Alge1XSb5fE-0",
  authDomain: "chat-d54c6.firebaseapp.com",
  projectId: "chat-d54c6",
  storageBucket: "chat-d54c6.appspot.com",
  messagingSenderId: "519800218209",
  appId: "1:519800218209:web:21f8bee864aaa1aa5f8020",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
