import NweetFactory from "components/NweetFactory/NweetFactory";
import NweetList from "components/NweetList/NweetList";
import { useEffect, useState } from "react";
import NweetService from "services/NweetService/NweetService";

const Home = ({ userObj }) => {
  const [nweetList, setNweetList] = useState([]);
  useEffect(() => {
    NweetService.queryNweetList({ setNweetList });
  })
  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <NweetList creatorId={userObj.uid} nweetList={nweetList} />
    </div>
  )
};

export default Home;