import FirebaseRepository from "repositories/FirebaseRepository";

const getNweetList = async ({ setNweetList }) => {
  FirebaseRepository.firestoreRepo.readNweetList(setNweetList);
};

const getNweetListByCreatorID = async ({ setNweetList, creatorId }) => {
  FirebaseRepository.firestoreRepo.readNweetList(setNweetList, creatorId);
};

const addNewNweet = async ({ uid, nweetText, nweetImage }, successCallback) => {
  const imageDownloadUrl = !!nweetImage && await FirebaseRepository.storageRepo.saveAttachment(uid, nweetImage);
  FirebaseRepository.firestoreRepo.saveNweet({ uid, nweetText, imageDownloadUrl }, successCallback);
};

const getNweet = (id) => {
  return FirebaseRepository.firestoreRepo.readNweet(id);
};

const editNweet = async ({ nweetText, nweet }, successCallback) => {
  FirebaseRepository.firestoreRepo.updateNweet({ nweetText, nweet }, successCallback);
};

const removeNweet = async (nweet, nweetImageUrl) => {
  const hasNweetImageUrl = !!nweetImageUrl;
  if (hasNweetImageUrl) {
    await FirebaseRepository.storageRepo.deletNweetImage(nweetImageUrl);
  }
  FirebaseRepository.firestoreRepo.deleteNweet(nweet);
};

const NweetService = {
  getNweetList,
  getNweetListByCreatorID,
  addNewNweet,
  getNweet,
  editNweet,
  removeNweet
};

export default NweetService;