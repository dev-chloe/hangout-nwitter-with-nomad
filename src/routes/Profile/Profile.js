import { useEffect, useState } from "react";
import NweetService from "services/NweetService";
import NweetList from "components/NweetList";
import ProfileForm from "components/ProfileForm";
import "./Profile.css";
import AuthService from "services/AuthService";

const Profile = ({ refreshUser, userObj }) => {
  const logout = () => {
    AuthService.logout();
    refreshUser();
  }

  const [nweetList, setNweetList] = useState([]);
  const creatorId = userObj.uid;
  useEffect(() => {
    NweetService.queryNweetListByCreatorId({ creatorId, setNweetList });
  }, []);

  return (
    <div className="container">
      <ProfileForm callAfterUpdateProfile={refreshUser} userObj={userObj} />
      <button className="form_btn cancel_btn logout" onClick={logout}>Logout</button>
      <NweetList nweetList={nweetList} creatorId={creatorId} />
    </div>
  )
};


export default Profile;
