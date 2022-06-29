import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "./FirebaseRepository";

const readNweetList = async (callback, creatorId) => {
  const firestoreQuery = getNweetListQuery(creatorId);
  executeQuery(firestoreQuery, callback);
};

const getNweetListQuery = (creatorId) => {
  return creatorId
    ? query(collection(firestore, "nweets"), where("creatorId", "==", creatorId), orderBy("createdAt", "desc"))
    : query(collection(firestore, "nweets"), orderBy("createdAt", "desc"));
};

const executeQuery = async (firestoreQuery, callback) => {
  onSnapshot(firestoreQuery, snapshot => {
    const nweetList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(nweetList);
  });
};

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
};

const readNweet = ({ id }) => {
  return doc(firestore, "nweets", id);
};

const updateNweet = async (
  { nweetText, nweet },
  successCallback = () => console.error("[FIXME] Not implemented! (for then) >"),
  errorCallack = (error) => console.error("[FIXME] Not implemented! (for catch) >", error)
) => {
  await updateDoc(nweet, {
    text: nweetText
  })
    .then(() => successCallback())
    .catch((error) => errorCallack(error));
};

const deleteNweet = async (nweet) => {
  await deleteDoc(nweet);
};

const FirestoreRepository = {
  readNweetList,
  saveNweet,
  readNweet,
  updateNweet,
  deleteNweet
};

export default FirestoreRepository;