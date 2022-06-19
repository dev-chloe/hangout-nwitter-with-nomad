import { authService } from "utils/fBase";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import style from "./Profile.module.css";
import NweetList from "components/NweetList/NweetList";
import NweetService from "services/NweetService/NweetService";

const Profile = ({ refreshUser, userObj }) => {
  const [nweetList, setNweetList] = useState([]);
  const creatorId = userObj.uid;
  useEffect(() => {
    NweetService.queryNweetListByCreatorID({ creatorId, setNweetList });
  }, [])
  return (
    <div className="container">
      <UpdateForm displayName={userObj.displayName} refreshUser={refreshUser} />
      <LogoutBtn refreshUser={refreshUser} />
      <NweetList creatorId={creatorId} nweetList={nweetList} />
    </div>
  )
};

const UpdateForm = ({ displayName, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(displayName);
  const onChange = (event) => {
    const { target: { value } } = event;
    setNewDisplayName(value);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    if (displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName
      })
      refreshUser();
    }
  }

  return (
    <form onSubmit={onSubmit} className={style.form}>
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
  )
}

const LogoutBtn = ({ refreshUser }) => {
  const onLogoutClick = () => {
    authService.signOut();
    refreshUser();
  }
  return (
    <button className={`form_btn cancel_btn ${style.logout}`} onClick={onLogoutClick}>Logout</button>
  )
}

export default Profile;