import { dbService } from "fBase";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  // const getNweets = async () => {
  //   const dbNweets = await getDocs(collection(dbService, "nweets"));
  //   dbNweets.forEach((doc) => {
  //     const nweetObject = {
  //       ...doc.data(),
  //       id: doc.id,
  //   };
  //   setNweets((prev) => [nweetObject, ...prev]);
  //   });
  // };
  useEffect(() => {
    const q = query(collection(dbService, "nweets"));
    onSnapshot(q, snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setNweets(nweetArray);
    })
    // getNweets();
  }, [])
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      })
    } catch (e) {
      console.log(e);
    }
    setNweet("");
  }
  const onChange = (event) => {
    const { target: { value } } = event;
    setNweet(value);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text" 
          placeholder="What's on your mind?" 
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map(nweet => <div key={nweet.id}>
          <h4>{nweet.text}</h4>
        </div>)}
      </div>
    </div>
  )
};

export default Home;