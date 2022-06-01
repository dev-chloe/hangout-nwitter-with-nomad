import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50, marginBottom: 50 }}>
      <li>
        <Link to="/" style={{ marginRight: 10 }}>
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
        </Link>
      </li>
      {userObj &&
        <li>
          <ProfileLink userObj={userObj} />
        </li>
      }
    </ul>
  </nav>
)

const ProfileLink = ({ userObj }) => {
  const userName = userObj.displayName ?? userObj.email.split("@")[0];
  return (
    <Link
      to="/profile"
      style={{
        marginLeft: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: 12,
      }}
    >
      <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
      <span style={{ marginTop: 10 }}>
        {userName} Profile
      </span>
    </Link>
  )
}

export default Navigation;