import Nweet from "components/Nweet";
import { dbService } from "fBase";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();
  const fileInput = useRef();
  useEffect(() => {
    const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setNweets(nweetArray);
    })
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
  const onFileChange = (event) => {
    const { target: { files } } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: {result} } = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }
  const onClearAttachment = () => {
    setAttachment(null);
    fileInput.current.value = null;
  };
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
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <input type="submit" value="Nweet" />
        {
          attachment && 
          <div>
              <img src={attachment} width="50px" height="50px" />
              <button onClick={onClearAttachment}>Clear</button>
          </div>
        }
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  )
};

export default Home;