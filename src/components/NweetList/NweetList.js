import Nweet from "./Nweet";
import "./NweetList.css";

const NweetList = ({ nweetList, creatorId }) => {
  return (
    <div className="nweet_list">
      {nweetList.map((nweet) => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwned={creatorId && nweet.creatorId === creatorId} />
      ))}
    </div>
  )
}

export default NweetList;
