import LoginForm from "components/LoginForm/LoginForm";
import SocialLoginButtons from "components/SocialLoginButtons/SocialLoginButtons";
import "./Login.css";

const Login = () => {
  return (
    <div className="loginContainer">
      <LoginForm />
      <SocialLoginButtons />
    </div>
  );
}

export default Login;