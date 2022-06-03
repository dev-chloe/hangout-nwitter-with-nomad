import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Setup
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth();
const firestore = getFirestore(app);
const storage = getStorage();

const createNewAccount = async ({ email, password }) => {
  await createUserWithEmailAndPassword(auth, email, password);
}

const signIn = async ({ email, password }) => {
  await signInWithEmailAndPassword(auth, email, password);
}

const signOut = async () => {
  auth.signOut();
}

const FirebaseRepository = {
  createNewAccount,
  signIn,
  signOut,
}

export default FirebaseRepository;