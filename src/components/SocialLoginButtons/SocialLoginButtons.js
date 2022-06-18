import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService } from "fBase";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SocialLoginButtons = () => {
  const onSocialClick = async (event) => {
    const { target: { name } } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  }
  return (
    <div className="login_btns">
      <button name="google" onClick={onSocialClick} className="login_btn">Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
      <button name="github" onClick={onSocialClick} className="login_btn">Continue with Github<FontAwesomeIcon icon={faGithub} /></button>
    </div>
  )
}

export default SocialLoginButtons;