import LoginForm from "components/LoginForm/LoginForm";
import SocialLoginButtons from "components/SocialLoginButtons/SocialLoginButtons";


const Auth = () => {
  return (
    <div className="container">
      <LoginForm />
      <SocialLoginButtons />
    </div>
  );
}

export default Auth;