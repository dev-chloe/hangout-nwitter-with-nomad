import { useEffect, useState } from "react";
import NweetService from "services/NweetService";
import NweetForm from "components/NweetForm";
import NweetList from "components/NweetList";

const Home = () => {
  const [nweetList, setNweetList] = useState([]);
  useEffect(() => {
    NweetService.getNweetList({ setNweetList });
  }, []);
  return (
    <div className="container">
      <NweetForm />
      <NweetList nweetList={nweetList} />
    </div >
  );
};

export default Home;
