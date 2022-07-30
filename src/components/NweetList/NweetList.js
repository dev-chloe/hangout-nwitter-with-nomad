import Nweet from "components/Nweet/Nweet";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import style from "./NweetList.module.scss";

const NweetList = ({ nweetList }) => {
  const creatorId = useSelector((state) => state.user.uid);
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
  nweetList: PropTypes.array.isRequired
};

export default NweetList;
