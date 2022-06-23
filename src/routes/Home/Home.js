import NweetFactory from "components/NweetFactory/NweetFactory";
import NweetList from "components/NweetList/NweetList";
import { useEffect, useState } from "react";
import NweetService from "services/NweetService/NweetService";

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