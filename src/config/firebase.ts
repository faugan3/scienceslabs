import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC20eE_3FGGhzVCL-Hnx2ye0fskZ-UElrs",
  authDomain: "prosport-guru-inc.firebaseapp.com",
  projectId: "prosport-guru-inc",
  storageBucket: "prosport-guru-inc.appspot.com",
  messagingSenderId: "384851572120",
  appId: "1:384851572120:web:6b31c6017fb9b4ac6367ed",
  measurementId: "G-MRCDZV9WQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;