import { useEffect, useState } from "react";
import { authService } from "utils/fBase";
import { updateProfile } from "firebase/auth";

import NweetService from "services/NweetService";
import NweetList from "components/NweetList";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogoutClick = () => {
    authService.signOut();
    refreshUser();
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

  const [nweetList, setNweetList] = useState([]);
  const creatorId = userObj.uid;
  useEffect(() => {
    NweetService.queryNweetListByCreatorId({ creatorId, setNweetList });
  }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display Name"
          autoFocus
          value={newDisplayName}
          onChange={onChange}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <button className="formBtn cancelBtn logOut" onClick={onLogoutClick}>Logout</button>
      <NweetList nweetList={nweetList} creatorId={creatorId} />
    </div>
  )
};

export default Profile;
