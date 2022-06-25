import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./SocialLoginButtons.module.css";
import AuthService from "services/AuthService/AuthService";
import FirebaseUtil from "utils/FirebaseUtil";

const SocialLoginButtons = () => {
  return (
    <div className={style.btn_wrapper}>
      <SocialLoginButton authProviderName={FirebaseUtil.Google} />
      <SocialLoginButton authProviderName={FirebaseUtil.Github} />
    </div>
  )
}

const SocialLoginButton = ({ authProviderName }) => {
  let socialIcon = null;
  switch (authProviderName) {
    case FirebaseUtil.Google:
      socialIcon = <FontAwesomeIcon icon={faGoogle} />
      break;
    case FirebaseUtil.Github:
      socialIcon = <FontAwesomeIcon icon={faGithub} />
      break;
    default:
      console.warn(`no socialIcon implementations: ${authProviderName}`)
      return;
  }
  return (
    <button
      name={authProviderName}
      onClick={onSocialClick}
      className={style.btn}
    >
      Continue with {authProviderName} {socialIcon}
    </button>
  )
}

const onSocialClick = async (event) => {
  const { target: { name } } = event;
  const authProviderName = name;
  AuthService.popupLogin(authProviderName);
}

export default SocialLoginButtons;