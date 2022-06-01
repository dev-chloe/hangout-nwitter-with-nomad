import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "utils/fBase";
import "./SocialLoginButtons.css"

const Google = "Google", GitHub = "GitHub";
const SocialLoginButtons = () => {
  return (
    <div className="socialLoginBtns">
      <SocialLoginButton vendor={Google} />
      <SocialLoginButton vendor={GitHub} />
    </div>
  )
}

const SocialLoginButton = ({ vendor }) => (
  <button name={vendor} onClick={onSocialClick} className="socialLoginBtn">
    Continue with {vendor} <SocialIcon vendor={vendor} />
  </button>
)

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
      throw new Error(`Not exist AuthProvider ${vender}`)
  }
  await signInWithPopup(authService, provider);
}

const SocialIcon = ({ vendor }) => {
  switch (vendor) {
    case Google:
      return <FontAwesomeIcon icon={faGoogle} />;
    case GitHub:
      return <FontAwesomeIcon icon={faGithub} />;
    default:
      throw new Error(`Not exist SocialIcon ${vendor}`)
  }
}

export default SocialLoginButtons;