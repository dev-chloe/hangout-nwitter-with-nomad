import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { dbService } from "utils/fBase";

const queryNweetList = ({ setNweetList }) => {
  const fbBaseQuery = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));
  executeQuery(fbBaseQuery, setNweetList)
}

const queryNweetListByCreatorID = ({ creatorId, setNweetList }) => {
  const fbBaseQuery = query(collection(dbService, "nweets"), where("creatorId", "==", creatorId), orderBy("createdAt", "desc"));
  executeQuery(fbBaseQuery, setNweetList)
}

const executeQuery = (fbBaseQuery, callback) => {
  onSnapshot(fbBaseQuery, snapshot => {
    const nweetArray = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(nweetArray);
  })
}

const NweetService = {
  queryNweetList,
  queryNweetListByCreatorID
};

export default NweetService;