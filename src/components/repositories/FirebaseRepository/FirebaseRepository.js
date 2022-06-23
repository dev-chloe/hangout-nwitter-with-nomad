import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

initializeApp(firebaseConfig);

const auth = getAuth();

const createNewAccount = async ({ email, password }) => {
  await createUserWithEmailAndPassword(auth, email, password);
}

const signIn = async ({ email, password }) => {
  await signInWithEmailAndPassword(auth, email, password);
}

const signOut = async () => {
  auth.signOut();
}

const checkAuthState = async (callback) => {
  auth.onAuthStateChanged(callback);
}

const saveProfile = async (profile) => {
  updateProfile(auth.currentUser, profile);
}
const FirebaseRepository = {
  createNewAccount,
  signIn,
  signOut,
  checkAuthState,
  saveProfile,
}

export default FirebaseRepository;