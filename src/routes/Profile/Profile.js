import { authService } from "utils/fBase";
import { useEffect, useState } from "react";
import style from "./Profile.module.css";
import NweetList from "components/NweetList/NweetList";
import NweetService from "services/NweetService/NweetService";
import ProfileForm from "components/ProfileForm/ProfileForm";

const Profile = ({ refreshUser, userObj }) => {
  const [nweetList, setNweetList] = useState([]);
  const creatorId = userObj.uid;
  useEffect(() => {
    NweetService.queryNweetListByCreatorID({ creatorId, setNweetList });
  }, [])
  return (
    <div className="container">
      <ProfileForm displayName={userObj.displayName} refreshUser={refreshUser} />
      <LogoutBtn refreshUser={refreshUser} />
      <NweetList creatorId={creatorId} nweetList={nweetList} />
    </div>
  )
};

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