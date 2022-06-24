import { useState } from "react";
import AuthService from "services/AuthService";

const ProfileForm = ({ callAfterUpdateProfile, userObj }) => {
  const oldDisplayName = userObj.displayName;
  const [newDisplayName, setNewDisplayName] = useState(oldDisplayName);
  const onChange = (event) => {
    const { target: { value } } = event;
    setNewDisplayName(value);
  }
  const saveUserInfo = async (event) => {
    event.preventDefault();
    const isChanged = oldDisplayName !== newDisplayName;
    if (isChanged) {
      AuthService.saveProfile({ displayName: newDisplayName }, callAfterUpdateProfile);
    }
  }
  return (
    <form className="profile_form" onSubmit={saveUserInfo}>
      <input
        className="form_input"
        type="text"
        placeholder="Display Name"
        value={newDisplayName}
        onChange={onChange}
        autoFocus
      />
      <input
        className="form_btn update_btn"
        type="submit"
        value="Update Profile"
      />
    </form>
  )
}

export default ProfileForm;