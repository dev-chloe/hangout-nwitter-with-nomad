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
      <span className="loginSwitch" onClick={toggleAccount}>
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
    try {
      if (isNewAccount) {
        AuthService.signUp({ email, password });
      } else {
        AuthService.login({ email, password })
      }
    } catch (e) {
      // TODO: Error handling
      setError(e.message);
    }
  }
  return (
    <form onSubmit={onSubmit} className="container">
      <Input type="email" placeholder="Email" onChange={onChange} />
      <Input type="password" placeholder="Password" onChange={onChange} />
      <Submit text={isNewAccount ? "Create Account" : "Login"} />
      {error && <span className="loginError">{error}</span>}
    </form>
  )
}

const Input = ({ onChange, type, placeholder }) => {
  return (
    <input
      className="loginInput"
      name={type}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required
    />
  )
}

const Submit = ({ text }) => (
  <input className="loginInput loginSubmit" type="submit" value={text} />
)


export default LoginForm;
