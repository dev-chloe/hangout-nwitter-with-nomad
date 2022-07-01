import PropTypes from "prop-types";
import AuthService from "services/AuthService";
import style from "./LogoutButton.module.scss";

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

LogoutButton.propTypes = {
  refreshUser: PropTypes.func.isRequired
};

export default LogoutButton;