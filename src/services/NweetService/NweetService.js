import { dbService } from "utils/fBase";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

const getAllNweetList = async ({ setNweetList }) => {
  const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));
  onSnapshot(q, snapshot => {
    const nweetList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNweetList(nweetList);
  })
}

const getMyNweetList = async ({ creatorId, setNweetList }) => {
  const q = query(collection(dbService, "nweets"), where("creatorId", "==", creatorId), orderBy("createdAt", "desc"));
  onSnapshot(q, snapshot => {
    const nweetList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNweetList(nweetList);
  })
}


const NweetService = {
  getAllNweetList,
  getMyNweetList
}

export default NweetService;