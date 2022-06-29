import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NweetService from "services/NweetService";
import NweetForm from "components/NweetForm";
import NweetList from "components/NweetList";

const Home = ({ userObj }) => {
  const [nweetList, setNweetList] = useState([]);
  const creatorId = userObj.uid;
  useEffect(() => {
    NweetService.getNweetList({ setNweetList });
  }, []);
  return (
    <div className="container">
      <NweetForm userObj={userObj} />
      <NweetList nweetList={nweetList} creatorId={creatorId} />
    </div >
  );
};

Home.propTypes = {
  userObj: PropTypes.object.isRequired
};

export default Home;
