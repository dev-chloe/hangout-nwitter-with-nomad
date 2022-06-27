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
      <SocialLoginButton authProviderName={FirebaseUtil.Instagram} />
    </div>
  )
}

const SocialLoginButton = ({ authProviderName }) => {
  const socialIcon = getSocialIcon({ authProviderName });
  const onSocialClick = async (event) => {
    const { target: { name } } = event;
    const authProviderName = name;
    AuthService.popupLogin(authProviderName);
  }
  return (socialIcon) && (
    <button
      className={style.btn}
      name={authProviderName}
      onClick={onSocialClick}
    >
      Continue with {authProviderName} {socialIcon}
    </button>
  )
}

const getSocialIcon = ({ authProviderName }) => {
  switch (authProviderName) {
    case FirebaseUtil.Google:
      return <FontAwesomeIcon icon={faGoogle} />;
    case FirebaseUtil.Github:
      return <FontAwesomeIcon icon={faGithub} />;
    default:
      console.warn(`no socialIcon implementations: ${authProviderName}`)
      return null;
  }
}

export default SocialLoginButtons;