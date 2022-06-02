import { authService } from "utils/fBase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
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
        // create accout
        await createUserWithEmailAndPassword(authService, email, password)
      } else {
        // login
        await signInWithEmailAndPassword(authService, email, password)
      }
    } catch (e) {
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
