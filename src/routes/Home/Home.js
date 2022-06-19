import NweetFactory from "components/NweetFactory";
import NweetList from "components/NweetList/NweetList";

const Home = ({ userObj }) => {
  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <NweetList uid={userObj.uid} />
    </div>
  )
};

export default Home;