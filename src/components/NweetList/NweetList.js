import Nweet from "components/NweetList/Nweet";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "utils/fBase";
import "./NweetList.css";

const NweetList = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setNweets(nweetArray);
    })
  }, [])
  return (
    <div className="nweet_list">
      {nweets.map((nweet) => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwned={nweet.creatorId === userObj.uid} />
      ))}
    </div>
  )
}

export default NweetList;