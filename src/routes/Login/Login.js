import LoginForm from "components/LoginForm/LoginForm";
import SocialLoginButtons from "components/SocialLoginButtons/SocialLoginButtons";
import style from "./Login.module.css";


const Auth = () => {
  return (
    <div className={`container ${style.wrapper}`}>
      <LoginForm />
      <SocialLoginButtons />
    </div>
  );
}

export default Auth;