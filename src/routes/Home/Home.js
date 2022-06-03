import NweetFactory from "components/NweetFactory";
import NweetList from "components/NweetList";

const Home = ({ userObj }) => {
  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <NweetList creatorId={userObj.uid} />
    </div>
  )
};

export default Home;