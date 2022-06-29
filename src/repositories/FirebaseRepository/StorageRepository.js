import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "./FirebaseRepository";

const saveAttachment = async (uid, attachment) => {
  const attachmentRef = ref(storage, `${uid}/${uuidv4()}`);
  const response = await uploadString(attachmentRef, attachment, "data_url");
  return await getDownloadURL(response.ref);
};

const deletNweetImage = async (nweetImageUrl) => {
  return await deleteObject(ref(storage, nweetImageUrl));
};

const StorageRepository = {
  saveAttachment,
  deletNweetImage
};

export default StorageRepository;