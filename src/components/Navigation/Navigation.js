import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import style from "./Navigation.module.css";

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
  )
}

const ProfileLink = ({ displayName }) => {
  return (
    <Link to="/profile" className={style.profile_wrap}>
      <FontAwesomeIcon icon={faUser} className={style.icon} />
      <span>
        {displayName}'s Profile
      </span>
    </Link>
  )
}

export default Navigation;