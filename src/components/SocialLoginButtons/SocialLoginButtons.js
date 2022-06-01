import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "utils/fBase";
import "./SocialLoginButtons.css";

const Google = "Google";
const GitHub = "GitHub";

const SocialLoginButtons = () => {
  return (
    <div className="socialLoginBtns">
      <SocialLoginButton vendor={Google} />
      <SocialLoginButton vendor={GitHub} />
      <SocialLoginButton vendor="Instagram" />
    </div>
  )
}

const SocialLoginButton = ({ vendor }) => {
  let socialIcon = null;
  switch (vendor) {
    case Google:
      socialIcon = <FontAwesomeIcon icon={faGoogle} />
      break;
    case GitHub:
      socialIcon = <FontAwesomeIcon icon={faGithub} />
      break;
    default:
      console.error(`No SocialIcon implementations: ${vendor}`)
      return;
  }
  return (
    <button className="socialLoginBtn" name={vendor} onClick={onSocialClick}>
      Continue with {vendor} {socialIcon}
    </button>
  )
}

const onSocialClick = async (event) => {
  const { target: { name } } = event;
  let provider = null;
  switch (name) {
    case Google:
      provider = new GoogleAuthProvider();
      break;
    case GitHub:
      provider = new GithubAuthProvider();
      break;
    default:
      throw new Error(`No AuthProvider implementations: ${vender}`);
  }
  await signInWithPopup(authService, provider);
}

export default SocialLoginButtons;