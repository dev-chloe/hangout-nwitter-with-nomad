import { useEffect, useState } from "react";
import NweetService from "services/NweetService";
import Nweet from "./Nweet";
import "./NweetList.css";

const NweetList = ({ canViewOnlyOwned, creatorId }) => {
  const [nweetList, setNweetList] = useState([]);
  useEffect(() => {
    if (canViewOnlyOwned) {
      NweetService.getMyNweetList({ creatorId, setNweetList });
      return;
    }
    NweetService.getAllNweetList({ setNweetList });
  }, []);
  return (
    <div className="nweet_list">
      {nweetList.map((nweet) => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwned={nweet.creatorId === creatorId} />
      ))}
    </div>
  )
}

export default NweetList;