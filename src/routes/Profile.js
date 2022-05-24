import { authService } from "fBase";

const Profile = () => {
  const onLogoutClikc = () => {
    authService.signOut();
  }
  return <><button onClick={onLogoutClikc}>Logout</button></>
};

export default Profile;