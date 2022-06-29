import Nweet from "components/Nweet/Nweet";
import PropTypes from "prop-types";
import style from "./NweetList.module.css";

const NweetList = ({ creatorId, nweetList }) => {
  return (
    <div className={style.wrapper}>
      {nweetList.map((nweet) => (
        <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwned={creatorId && nweet.creatorId === creatorId}
        />
      ))}
    </div>
  );
};

NweetList.propTypes = {
  creatorId: PropTypes.string.isRequired,
  nweetList: PropTypes.array.isRequired
};

export default NweetList;
