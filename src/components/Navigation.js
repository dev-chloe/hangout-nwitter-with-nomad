import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  if (userObj.displayName === null) {
    const userName = userObj.email.split("@")[0];
    userObj.displayName = userName;
  }
  return (
    <nav>
      <ul className="nav_wrapper">
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} className="nav_icon" />
          </Link>
        </li>
        <li>
          <Link to="/profile" className="profile_wrap">
            <FontAwesomeIcon icon={faUser} className="nav_icon" />
            <span>
              {userObj.displayName} Profile
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;