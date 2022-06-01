import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from "components/AuthForm";
import { authService } from "utils/fBase";
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
    <div className="authContainer">
      <AuthForm />
      <div className="authBtns">
        <button name="google" onClick={onSocialClick} className="authBtn">Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
        <button name="github" onClick={onSocialClick} className="authBtn">Continue with Github<FontAwesomeIcon icon={faGithub} /></button>
      </div>
    </div>
  );
}

export default Auth;