
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import {getFirestore} from '@firebase/firestore'
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXutJ-FKe7EaZwuK-zlkhOT2HjhpzLnPk",
  authDomain: "learning-app-3fe3f.firebaseapp.com",
  projectId: "learning-app-3fe3f",
  storageBucket: "learning-app-3fe3f.appspot.com",
  messagingSenderId: "566121996756",
  appId: "1:566121996756:web:4ed50c2d71f8d649e83641",
  measurementId: "G-88X95HC560"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)
export  const storage = getStorage(app)
export const storageRef = ref(storage)