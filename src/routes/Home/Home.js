import { useEffect, useState } from "react";

import NweetList from "components/NweetList";
import NweetService from "services/NweetService";
import NweetWritter from "components/NweetWritter";

const Home = ({ userObj }) => {
  const [nweetList, setNweetList] = useState([]);
  const creatorId = userObj.uid;
  useEffect(() => {
    NweetService.queryNweetList({ setNweetList });
  }, []);

  return (
    <div className="container">
      <NweetWritter userObj={userObj} />
      <NweetList nweetList={nweetList} creatorId={creatorId} />
    </div>
  )
};

export default Home;
