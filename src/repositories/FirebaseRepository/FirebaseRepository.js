import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AuthRepository from "./AuthRepository";
import FirestoreRepository from "./FirestoreRepository";
import StorageRepository from "./StorageRepository";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage();
export const firestore = getFirestore();

const authRepo = AuthRepository;
const firestoreRepo = FirestoreRepository;
const storageRepo = StorageRepository;

const FirebaseRepository = {
  authRepo,
  firestoreRepo,
  storageRepo
};

export default FirebaseRepository;
