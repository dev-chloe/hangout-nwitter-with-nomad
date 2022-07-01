import NweetRepository from "repositories/firebase/NweetRepository";
import AttachmentRepository from "repositories/firebase/AttachmentRepository";

const getNweetList = async ({ setNweetList }) => {
  NweetRepository.readNweetList(setNweetList);
};

const getNweetListByCreatorID = async ({ setNweetList, creatorId }) => {
  NweetRepository.readNweetList(setNweetList, creatorId);
};

const addNewNweet = async ({ uid, nweetText, nweetImage }, successCallback) => {
  const imageDownloadUrl = !!nweetImage && await AttachmentRepository.saveAttachment(uid, nweetImage);
  NweetRepository.saveNweet({ uid, nweetText, imageDownloadUrl }, successCallback);
};

const getNweet = (id) => {
  return NweetRepository.readNweet(id);
};

const editNweet = async ({ nweetText, nweet }, successCallback) => {
  NweetRepository.updateNweet({ nweetText, nweet }, successCallback);
};

const removeNweet = async (nweet, nweetImageUrl) => {
  const hasNweetImageUrl = !!nweetImageUrl;
  if (hasNweetImageUrl) {
    await AttachmentRepository.deleteAttachment(nweetImageUrl);
  }
  NweetRepository.deleteNweet(nweet);
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