import { useEffect, useState } from "react";

import NweetFactory from "components/NweetFactory";
import NweetList from "components/NweetList";
import NweetService from "services/NweetService";

const Home = ({ userObj }) => {
  const [nweetList, setNweetList] = useState([]);
  const creatorId = userObj.uid;
  useEffect(() => {
    NweetService.queryNweetList({ setNweetList });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <NweetList nweetList={nweetList} creatorId={creatorId} />
    </div>
  )
};

export default Home;