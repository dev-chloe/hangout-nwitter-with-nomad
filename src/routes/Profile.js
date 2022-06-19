import { authService, dbService } from "utils/fBase";
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
    <div className="container">
      <form onSubmit={onSubmit} className="profile_form">
        <input
          type="text"
          placeholder="Display Name"
          autoFocus
          value={newDisplayName}
          onChange={onChange}
          className="form_input"
        />
        <input
          type="submit"
          value="Update Profile"
          className="form_btn last_btn"
        />
      </form>
      <button className="form_btn cancel_btn logout" onClick={onLogoutClikc}>Logout</button>
    </div>
  )
};

export default Profile;