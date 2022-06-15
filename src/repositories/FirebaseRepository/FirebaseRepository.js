import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
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

const createNewAccount = async ({
  email,
  password,
  callbackOnError = (error) => {
    console.log("[ERROR] createNewAccount >", error);
  }
}) => {
  // https://firebase.google.com/docs/reference/js/auth.md#createuserwithemailandpassword
  await createUserWithEmailAndPassword(auth, email, password)
    .catch(callbackOnError);
}

const signIn = async ({
  email,
  password,
  callbackOnError = (error) => {
    console.log("[ERROR] signIn >", error);
  }
}) => {
  // https://firebase.google.com/docs/reference/js/auth.md#signinwithemailandpassword
  await signInWithEmailAndPassword(auth, email, password)
    .catch(callbackOnError);
}

const signOut = async () => {
  auth.signOut();
}

const changeAuthState = async (callback) => {
  auth.onAuthStateChanged(callback);
}

const saveProfile = async (profile) => {
  updateProfile(auth.currentUser, profile);
}

const FirebaseRepository = {
  createNewAccount,
  signIn,
  signOut,
  changeAuthState,
  saveProfile,
}

export default FirebaseRepository;