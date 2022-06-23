import Nweet from "components/Nweet/Nweet";
import style from "./NweetList.module.css";

const NweetList = ({ creatorId, nweetList }) => {
  return (
    <div className={style.wrapper}>
      {nweetList.map((nweet) => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwned={creatorId && nweet.creatorId === creatorId} />
      ))}
    </div>
  )
}

export default NweetList;