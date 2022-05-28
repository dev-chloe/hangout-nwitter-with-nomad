import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  if (userObj.displayName === null) {
    const userName = userObj.email.split("@")[0];
    userObj.displayName = userName;
  }
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">{userObj.displayName} Profile</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation;