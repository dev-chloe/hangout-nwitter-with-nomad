import LoginForm from "components/LoginForm";
import SocialLoginButtons from "components/SocialLoginButtons";

const Login = () => {
  return (
    <div className="container">
      <LoginForm />
      <SocialLoginButtons />
    </div>
  );
};

export default Login;