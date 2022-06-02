import NweetFactory from "components/NweetFactory";
import NweetList from "components/NweetList";

const Home = ({ userObj }) => {
  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <NweetList userObj={userObj} />
    </div>
  )
};

export default Home;