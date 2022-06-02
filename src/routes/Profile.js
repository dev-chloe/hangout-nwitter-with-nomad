import { authService, dbService } from "utils/fBase";
import { updateProfile } from "firebase/auth";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Nweet from "components/NweetList/Nweet/Nweet";

const Profile = ({ refreshUser, userObj }) => {
  const [nweets, setNweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogoutClick = () => {
    authService.signOut();
    refreshUser();
  }
  const getMyNweets = async () => {
    const q = query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"));
    onSnapshot(q, snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setNweets(nweetArray);
    })
  }
  const onChange = (event) => {
    const { target: { value } } = event;
    setNewDisplayName(value);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName
      })
      refreshUser();
    }
  }
  useEffect(() => {
    getMyNweets();
  }, [])
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display Name"
          autoFocus
          value={newDisplayName}
          onChange={onChange}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <button className="formBtn cancelBtn logOut" onClick={onLogoutClick}>Logout</button>
      {nweets.map((nweet) => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
      ))}
    </div>
  )
};

export default Profile;