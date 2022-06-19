import Nweet from "components/Nweet/Nweet";
import { dbService } from "utils/fBase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import style from "./NweetList.module.css";

const NweetList = ({ creatorId, nweetList }) => {
  return (
    <div className={style.wrapper}>
      {nweetList.map((nweet) => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === creatorId} />
      ))}
    </div>
  )
}

export default NweetList;