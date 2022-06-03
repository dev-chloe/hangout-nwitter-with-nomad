import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navigation = ({ displayName }) => (
  <nav>
    <ul className="nav_wrap">
      <li>
        <Link to="/">
          <FontAwesomeIcon icon={faTwitter} className="nweet_icon" />
        </Link>
      </li>
      {displayName &&
        <li>
          <ProfileLink displayName={displayName} />
        </li>
      }
    </ul>
  </nav>
)

const ProfileLink = ({ displayName }) => {
  return (
    <Link to="/profile" className="profile">
      <FontAwesomeIcon icon={faUser} className="nweet_icon" />
      <span className="mg_top">
        {displayName}'s Profile
      </span>
    </Link>
  )
}

export default Navigation;