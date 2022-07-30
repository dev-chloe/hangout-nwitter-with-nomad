import { useState } from "react";
import PropTypes from "prop-types";
import AuthService from "services/AuthService";
import style from "./ProfileForm.module.scss";
import { useSelector } from "react-redux";

const ProfileForm = ({ callAfterUpdateProfile }) => {
  const oldDisplayName = useSelector((state) => state.user.displayName);
  const [newDisplayName, setNewDisplayName] = useState(oldDisplayName);

  const onChange = (event) => {
    const { target: { value } } = event;
    setNewDisplayName(value);
  };

  const saveUserInfo = async (event) => {
    event.preventDefault();
    const isChanged = oldDisplayName !== newDisplayName;
    if (isChanged) {
      AuthService.saveProfile({ displayName: newDisplayName }, callAfterUpdateProfile);
    }
  };

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
  );
};

ProfileForm.propTypes = {
  callAfterUpdateProfile: PropTypes.func.isRequired
};

export default ProfileForm;