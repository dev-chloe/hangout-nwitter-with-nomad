import { useState } from "react";
import style from "./ProfileForm.module.css";
import AuthService from "services/AuthService/AuthService";

const ProfileForm = ({ userObj, callAfterUpdateProfile }) => {
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
      AuthService.saveProfile({ displayName: newDisplayName });
      callAfterUpdateProfile();
    }
  }

  return (
    <form className={style.form} onSubmit={saveUserInfo}>
      <input
        className="form_input"
        type="text"
        placeholder="Display Name"
        value={newDisplayName}
        onChange={onChange}
        autoFocus
      />
      <input
        className="form_btn last_btn"
        type="submit"
        value="Update Profile"
      />
    </form>
  )
}

export default ProfileForm;