import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService } from "fBase";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import style from "./SocialLoginButtons.module.css";

const Google = "google";
const Github = "github";

const SocialLoginButtons = () => {
  return (
    <div className={style.btn_wrapper}>
      <SocialLoginBtn vander={Google} />
      <SocialLoginBtn vander={Github} />
    </div>
  )
}

const SocialLoginBtn = ({ vander }) => {
  let socialIcon = null;
  switch (vander) {
    case Google:
      socialIcon = <FontAwesomeIcon icon={faGoogle} />
      break;
    case Github:
      socialIcon = <FontAwesomeIcon icon={faGithub} />
      break;
    default:
      console.warn(`no socialIcon implementations: ${vander}`)
      return;
  }
  return (
    <button
      name={vander}
      onClick={onSocialClick}
      className={style.btn}
    >
      Continue with {vander} {socialIcon}
    </button>
  )
}

const onSocialClick = async (event) => {
  const { target: { name } } = event;
  let provider;
  switch (name) {
    case Google:
      provider = new GoogleAuthProvider();
      break;
    case Github:
      provider = new GithubAuthProvider();
      break;
    default:
      throw new Error(`No AuthProvider implementations: ${vender}`);
  }
  await signInWithPopup(authService, provider);
}

export default SocialLoginButtons;