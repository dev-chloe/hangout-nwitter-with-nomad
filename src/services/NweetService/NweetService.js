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

const NweetService = {
  queryNweetList,
  queryNweetListByCreatorID
};

export default NweetService;