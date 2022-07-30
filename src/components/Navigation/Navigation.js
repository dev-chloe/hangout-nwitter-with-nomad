import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import style from "./Navigation.module.scss";
import { useSelector } from "react-redux";

const Navigation = () => {
  const userName = useSelector((state) => state.user.displayName);
  return (
    <nav>
      <ul className={style.wrapper}>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} className={style.icon} />
          </Link>
        </li>
        {userName &&
          <li>
            <ProfileLink />
          </li>
        }
      </ul>
    </nav>
  );
};

const ProfileLink = () => {
  const userName = useSelector((state) => state.user.displayName);
  return (
    <Link to="/profile" className={style.profile_wrap}>
      <FontAwesomeIcon icon={faUser} className={style.icon} />
      <span>{userName}&apos;s Profile</span>
    </Link>
  );
};

export default Navigation;