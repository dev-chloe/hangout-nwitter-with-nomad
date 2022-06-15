import { useState } from "react";
import AuthService from "services/AuthService";
import "./LoginForm.css";

const LoginForm = () => {
  const [isNewAccount, setIsNewAccount] = useState(true);
  const toggleAccount = () => {
    setIsNewAccount((prev) => !prev);
  }
  return (
    <>
      <Form isNewAccount={isNewAccount} />
      <span className="login_switch" onClick={toggleAccount}>
        {isNewAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  )
}

const Form = ({ isNewAccount = true }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event) => {
    const { target: { name, value } } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    const userInput = { email, password }
    if (isNewAccount) {
      AuthService.signUp(userInput, setError);
    } else {
      AuthService.login(userInput, setError);
    }
  }
  return (
    <form onSubmit={onSubmit} className="container">
      <Input type="email" placeholder="Email" onChange={onChange} />
      <Input type="password" placeholder="Password" onChange={onChange} />
      <Submit text={isNewAccount ? "Create Account" : "Login"} />
      {error && <span className="login_error">{error}</span>}
    </form>
  )
}

const Input = ({ onChange, type, placeholder }) => {
  return (
    <input
      className="login_input"
      name={type}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required
    />
  )
}

const Submit = ({ text }) => (
  <input className="login_input login_submit" type="submit" value={text} />
)


export default LoginForm;
