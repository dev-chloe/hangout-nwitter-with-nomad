import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../Firebase";

const saveAttachment = async (uid, attachment) => {
  const attachmentRef = ref(storage, `${uid}/${uuidv4()}`);
  const response = await uploadString(attachmentRef, attachment, "data_url");
  return await getDownloadURL(response.ref);
};

const deleteAttachment = async (attachmentUrl) => {
  return await deleteObject(ref(storage, attachmentUrl));
};

const StorageRepository = {
  saveAttachment,
  deleteAttachment
};

export default StorageRepository;