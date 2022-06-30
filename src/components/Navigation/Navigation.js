import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./Navigation.module.scss";

const Navigation = ({ displayName }) => {
  return (
    <nav>
      <ul className={style.wrapper}>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} className={style.icon} />
          </Link>
        </li>
        {displayName &&
          <li>
            <ProfileLink displayName={displayName} />
          </li>
        }
      </ul>
    </nav>
  );
};

const ProfileLink = ({ displayName }) => {
  return (
    <Link to="/profile" className={style.profile_wrap}>
      <FontAwesomeIcon icon={faUser} className={style.icon} />
      <span>{displayName}&apos;s Profile</span>
    </Link>
  );
};

Navigation.propTypes = {
  displayName: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

ProfileLink.propTypes = {
  displayName: PropTypes.string.isRequired
};

export default Navigation;