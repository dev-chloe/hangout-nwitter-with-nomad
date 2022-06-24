import FirebaseRepository from "repositories/FirebaseRepository";

const queryNweetList = async ({ setNweetList }) => {
  FirebaseRepository.readNweetList(setNweetList);
}

const queryNweetListByCreatorId = async ({ setNweetList, creatorId }) => {
  FirebaseRepository.readNweetList(setNweetList, creatorId);
}

const addNewNweet = async ({ nweetText, nweetImage, uid }, successCallback) => {
  const imageDownloadUrl = !!nweetImage && await FirebaseRepository.saveAttachment(uid, nweetImage);
  FirebaseRepository.saveNweet({ nweetText, imageDownloadUrl, uid }, successCallback);
}

const NweetService = {
  queryNweetList,
  queryNweetListByCreatorId,
  addNewNweet
};

export default NweetService;