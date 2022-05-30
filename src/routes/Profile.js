import { authService, dbService } from "fBase";
import { updateProfile } from "firebase/auth";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogoutClikc = () => {
    authService.signOut();
  }
  const getMyNweets = async () => {
    const q = query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"));
    onSnapshot(q, snapshot => {
      snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
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
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display Name" value={newDisplayName} onChange={onChange} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogoutClikc}>Logout</button>
    </>
  )
};

export default Profile;