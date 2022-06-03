import { dbService } from "utils/fBase";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

const queryNweetList = async ({ setNweetList }) => {
  const fBaseQuery = query(
    collection(dbService, "nweets"),
    orderBy("createdAt", "desc")
  )
  executeQuery(fBaseQuery, setNweetList);
}

const queryNweetListByCreatorId = async ({ creatorId, setNweetList }) => {
  const fBaseQuery = query(
    collection(dbService, "nweets"),
    where("creatorId", "==", creatorId),
    orderBy("createdAt", "desc")
  )
  executeQuery(fBaseQuery, setNweetList);
}

const executeQuery = async (fBaseQuery, callBack) => {
  onSnapshot(
    fBaseQuery,
    snapshot => {
      const nweetList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callBack(nweetList);
    }
  );
}

const NweetService = {
  queryNweetList,
  queryNweetListByCreatorId
};

export default NweetService;