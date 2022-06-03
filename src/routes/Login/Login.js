import LoginForm from "components/LoginForm/LoginForm";
import SocialLoginButtons from "components/SocialLoginButtons/SocialLoginButtons";
import "./Login.css";

const Login = () => {
  return (
    <div className="login_container">
      <LoginForm />
      <SocialLoginButtons />
    </div>
  );
}

export default Login;