import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { authService } from "utils/fBase";
import style from "./ProfileForm.module.css";

const ProfileForm = ({ displayName, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(displayName);
  const onChange = (event) => {
    const { target: { value } } = event;
    setNewDisplayName(value);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    if (displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName
      })
      refreshUser();
    }
  }

  return (
    <form onSubmit={onSubmit} className={style.form}>
      <input
        type="text"
        placeholder="Display Name"
        autoFocus
        value={newDisplayName}
        onChange={onChange}
        className="form_input"
      />
      <input
        type="submit"
        value="Update Profile"
        className="form_btn last_btn"
      />
    </form>
  )
}

export default ProfileForm;