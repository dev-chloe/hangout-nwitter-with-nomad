import Nweet from "components/Nweet/Nweet";
import { dbService } from "fBase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import style from "./NweetList.module.css";

const NweetList = ({ uid }) => {
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
    <div className={style.wrapper}>
      {nweets.map((nweet) => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === uid} />
      ))}
    </div>
  )
}

export default NweetList;