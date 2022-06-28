import { useEffect, useState } from "react";
import ProfileForm from "components/ProfileForm";
import NweetList from "components/NweetList";
import NweetService from "services/NweetService";
import AuthService from "services/AuthService";
import style from "./Profile.module.css";

const Profile = ({ refreshUser, userObj }) => {
  const [nweetList, setNweetList] = useState([]);
  const creatorId = userObj.uid;
  useEffect(() => {
    NweetService.getNweetListByCreatorID({ creatorId, setNweetList });
  }, []);
  return (
    <div className="container">
      <ProfileForm userObj={userObj} callAfterUpdateProfile={refreshUser} />
      <LogoutButton refreshUser={refreshUser} />
      <NweetList creatorId={creatorId} nweetList={nweetList} />
    </div>
  );
};

const LogoutButton = ({ refreshUser }) => {
  const logout = () => {
    AuthService.logout();
    refreshUser();
  };
  return (
    <button
      className={`form_btn cancel_btn ${style.logout}`}
      onClick={logout}
    >
      Logout
    </button>
  );
};

export default Profile;