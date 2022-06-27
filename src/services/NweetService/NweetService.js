import FirebaseRepository from "repositories/FirebaseRepository/FirebaseRepository";

const getNweetList = async ({ setNweetList }) => {
  FirebaseRepository.readNweetList(setNweetList)
}

const getNweetListByCreatorID = async ({ setNweetList, creatorId }) => {
  FirebaseRepository.readNweetList(setNweetList, creatorId)
}

const addNewNweet = async ({ uid, nweetText, nweetImage }, successCallback) => {
  const imageDownloadUrl = !!nweetImage && await FirebaseRepository.saveAttachment(uid, nweetImage);
  FirebaseRepository.saveNweet({ uid, nweetText, imageDownloadUrl }, successCallback)
}

const getNweet = (id) => {
  return FirebaseRepository.readNweet(id);
}

const editNweet = async ({ nweetText, nweet }, successCallback) => {
  FirebaseRepository.updateNweet({ nweetText, nweet }, successCallback)
}

const removeNweet = async (nweet, nweetImageUrl) => {
  !!nweetImageUrl && await FirebaseRepository.deletNweetImage(nweetImageUrl);
  FirebaseRepository.deleteNweet(nweet);
}

const NweetService = {
  getNweetList,
  getNweetListByCreatorID,
  addNewNweet,
  getNweet,
  editNweet,
  removeNweet,
};

export default NweetService;