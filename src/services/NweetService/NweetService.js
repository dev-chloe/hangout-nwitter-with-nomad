import FirebaseRepository from "components/repositories/FirebaseRepository/FirebaseRepository";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { dbService } from "utils/fBase";

const queryNweetList = async ({ setNweetList }) => {
  const fbBaseQuery = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));
  executeQuery(fbBaseQuery, setNweetList)
}

const queryNweetListByCreatorID = async ({ creatorId, setNweetList }) => {
  const fbBaseQuery = query(collection(dbService, "nweets"), where("creatorId", "==", creatorId), orderBy("createdAt", "desc"));
  executeQuery(fbBaseQuery, setNweetList)
}

const executeQuery = async (fbBaseQuery, callback) => {
  onSnapshot(fbBaseQuery, snapshot => {
    const nweetList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(nweetList);
  })
}

const addNewNweet = async ({ uid, nweetText, nweetImage }, successCallback) => {
  const imageDownloadUrl = !!nweetImage && await FirebaseRepository.saveAttachment(uid, nweetImage);
  FirebaseRepository.saveNweet({ uid, nweetText, imageDownloadUrl }, successCallback)
}

const NweetService = {
  queryNweetList,
  queryNweetListByCreatorID,
  addNewNweet
};

export default NweetService;