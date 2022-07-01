import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProfileForm from "components/ProfileForm";
import NweetList from "components/NweetList";
import NweetService from "services/NweetService";
import LogoutButton from "components/LogoutButton";

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

Profile.propTypes = {
  refreshUser: PropTypes.func.isRequired,
  userObj: PropTypes.object.isRequired
};

export default Profile;
