import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

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
const storage = getStorage();
const firestore = getFirestore();

const createNewAccount = async ({
  email,
  password,
  callbackError = (error) => {
    console.log(("[ERROR] createNewAccount >", error))
  }
}) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .catch(callbackError);
}

const signIn = async ({
  email,
  password,
  callbackError = (error) => {
    console.log(("[ERROR] signIn >", error))
  }
}) => {
  await signInWithEmailAndPassword(auth, email, password).catch(callbackError);
}

const signInWithAuthProvider = async (authProvider) => {
  await signInWithPopup(auth, authProvider);
}

const signOut = async () => {
  auth.signOut();
}

const checkAuthState = async (callback) => {
  auth.onAuthStateChanged(callback);
}

const saveProfile = async (
  profile,
  successCallback = () => console.error("[FIXME] Not implemented! (for then) >"),
  errorCallack = (error) => console.error("[FIXME] Not implemented! (for catch) >", error)
) => {
  updateProfile(auth.currentUser, profile)
    .then(() => successCallback())
    .catch((error) => errorCallack(error));
}

const readNweetList = async (callback, creatorId) => {
  const firestoreQuery = getNweetListQuery(creatorId);
  executeQuery(firestoreQuery, callback)
}

const getNweetListQuery = (creatorId) => {
  return creatorId
    ? query(collection(firestore, "nweets"), where("creatorId", "==", creatorId), orderBy("createdAt", "desc"))
    : query(collection(firestore, "nweets"), orderBy("createdAt", "desc"))
}

const executeQuery = async (firestoreQuery, callback) => {
  onSnapshot(firestoreQuery, snapshot => {
    const nweetList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(nweetList);
  })
}

const saveAttachment = async (uid, attachment) => {
  const attachmentRef = ref(storage, `${uid}/${uuidv4()}`);
  const response = await uploadString(attachmentRef, attachment, "data_url");
  return await getDownloadURL(response.ref);
}

const saveNweet = async (
  { nweetText, uid, imageDownloadUrl },
  successCallback = () => console.error("[FIXME] Not implemented! (for then) >"),
  errorCallack = (error) => console.error("[FIXME] Not implemented! (for catch) >", error)
) => {
  await addDoc(collection(firestore, "nweets"), {
    text: nweetText,
    createdAt: Date.now(),
    creatorId: uid,
    attachmentUrl: imageDownloadUrl
  })
    .then(() => successCallback())
    .catch((error) => errorCallack(error));
}

const readNweet = ({ id }) => {
  return doc(firestore, "nweets", id);
}

const updateNweet = async (
  { nweetText, nweet },
  successCallback = () => console.error("[FIXME] Not implemented! (for then) >"),
  errorCallack = (error) => console.error("[FIXME] Not implemented! (for catch) >", error)
) => {
  await updateDoc(nweet, {
    text: nweetText,
  })
    .then(() => successCallback())
    .catch((error) => errorCallack(error));
}

const deleteNweet = async (nweet) => {
  await deleteDoc(nweet);
}

const deletNweetImage = async (nweetImageUrl) => {
  return await deleteObject(ref(storage, nweetImageUrl));
}

const FirebaseRepository = {
  createNewAccount,
  signIn,
  signInWithAuthProvider,
  signOut,
  checkAuthState,
  saveProfile,
  readNweetList,
  saveAttachment,
  saveNweet,
  readNweet,
  updateNweet,
  deleteNweet,
  deletNweetImage
}

export default FirebaseRepository;