import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProfileForm from "components/ProfileForm";
import NweetList from "components/NweetList";
import NweetService from "services/NweetService";
import AuthService from "services/AuthService";
import style from "./Profile.module.scss";

const Profile = ({ refreshUser, userObj }) => {
  const [nweetList, setNweetList] = useState([]);
  const creatorId = userObj.uid;
  useEffect(() => {
    NweetService.getNweetListByCreatorID({ creatorId, setNweetList });
  }, []);
  console.log(typeof(refreshUser));
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

Profile.propTypes = {
  refreshUser: PropTypes.func.isRequired,
  userObj: PropTypes.object.isRequired
};

LogoutButton.propTypes = {
  refreshUser: PropTypes.func.isRequired
};

export default Profile;
