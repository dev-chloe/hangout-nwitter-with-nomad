import FirebaseRepository from "components/repositories/FirebaseRepository/FirebaseRepository";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { dbService } from "utils/fBase";

const queryNweetList = async ({ setNweetList }) => {
  FirebaseRepository.readNweetList(setNweetList)
}

const queryNweetListByCreatorID = async ({ setNweetList, creatorId }) => {
  FirebaseRepository.readNweetList(setNweetList, creatorId)
}

const addNewNweet = async ({ uid, nweetText, nweetImage }, successCallback) => {
  const imageDownloadUrl = !!nweetImage && await FirebaseRepository.saveAttachment(uid, nweetImage);
  FirebaseRepository.saveNweet({ uid, nweetText, imageDownloadUrl }, successCallback)
}

const NweetService = {
  queryNweetList,
  queryNweetListByCreatorID,
  addNewNweet,
};

export default NweetService;