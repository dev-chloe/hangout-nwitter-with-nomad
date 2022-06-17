import { faGithub, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from "components/AuthForm";
import { authService } from "fBase";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Auth = () => {
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
    <div className="container login_wrapper">
      <FontAwesomeIcon icon={faTwitter} className="nav_icon logo_icon" />
      <AuthForm />
      <div className="auth_btns">
        <button name="google" onClick={onSocialClick} className="auth_btn">Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
        <button name="github" onClick={onSocialClick} className="auth_btn">Continue with Github<FontAwesomeIcon icon={faGithub} /></button>
      </div>
    </div>
  );
}

export default Auth;