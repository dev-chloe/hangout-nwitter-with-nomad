import { dbService } from "fBase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        nweet,
        createdAt: Date.now(),
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
    </div>
  )
};

export default Home;