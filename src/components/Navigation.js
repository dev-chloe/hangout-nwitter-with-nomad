import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navigation = ({ displayName }) => {
  return (
    <nav>
      <ul className="nav_wrapper">
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} className="nav_icon" />
          </Link>
        </li>
        {displayName &&
          <li>
            <Link to="/profile" className="profile_wrap">
              <FontAwesomeIcon icon={faUser} className="nav_icon" />
              <span>
                {displayName} Profile
              </span>
            </Link>
          </li>
        }
      </ul>
    </nav>
  )
}

export default Navigation;