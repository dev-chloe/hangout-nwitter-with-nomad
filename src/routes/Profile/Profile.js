import { useEffect, useState } from "react";
import style from "./Profile.module.css";
import NweetService from "services/NweetService/NweetService";
import ProfileForm from "components/ProfileForm/ProfileForm";
import NweetList from "components/NweetList/NweetList";
import AuthService from "services/AuthService/AuthService";

const Profile = ({ refreshUser, userObj }) => {
  const [nweetList, setNweetList] = useState([]);
  const creatorId = userObj.uid;
  useEffect(() => {
    NweetService.getNweetListByCreatorID({ creatorId, setNweetList });
  }, [])
  return (
    <div className="container">
      <ProfileForm userObj={userObj} callAfterUpdateProfile={refreshUser} />
      <LogoutBtn refreshUser={refreshUser} />
      <NweetList creatorId={creatorId} nweetList={nweetList} />
    </div>
  )
};

const LogoutBtn = ({ refreshUser }) => {
  const logout = () => {
    AuthService.logout();
    refreshUser();
  }
  return (
    <button className={`form_btn cancel_btn ${style.logout}`} onClick={logout}>Logout</button>
  )
}

export default Profile;