import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProfileForm from "components/ProfileForm";
import NweetList from "components/NweetList";
import NweetService from "services/NweetService";
import LogoutButton from "components/LogoutButton";
import { useSelector } from "react-redux";

const Profile = ({ refreshUser }) => {
  const [nweetList, setNweetList] = useState([]);
  const creatorId = useSelector((state) => state.user.uid);
  useEffect(() => {
    NweetService.getNweetListByCreatorID({ creatorId, setNweetList });
  }, []);
  return (
    <div className="container">
      <ProfileForm callAfterUpdateProfile={refreshUser} />
      <LogoutButton refreshUser={refreshUser} />
      <NweetList nweetList={nweetList} />
    </div>
  );
};

Profile.propTypes = {
  refreshUser: PropTypes.func.isRequired
};

export default Profile;
