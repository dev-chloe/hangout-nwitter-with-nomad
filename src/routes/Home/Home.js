import { useEffect, useState } from "react";
import NweetService from "services/NweetService/NweetService";
import NweetWrite from "components/NweetWrite/NweetWrite";
import NweetList from "components/NweetList/NweetList";

const Home = ({ userObj }) => {
  const [nweetList, setNweetList] = useState([]);
  const creatorId = userObj.uid;
  useEffect(() => {
    NweetService.getNweetList({ setNweetList });
  }, []);
  return (
    <div className="container">
      <NweetWrite userObj={userObj} />
      <NweetList nweetList={nweetList} creatorId={creatorId} />
    </div>
  )
};

export default Home;