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
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // FIXME
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
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Submit text={isNewAccount ? "Create Account" : "Login"} />
      {error && <span className="loginError">{error}</span>}
    </form>
  )
}

const Input = ({ type, placeholder }) => {
  const [data, setData] = useState("");
  const onChange = (event) => {
    const { target: { value } } = event;
    setData(value);
  }
  return (
    <input
      className="loginInput"
      name={type}
      type={type}
      placeholder={placeholder}
      value={data}
      onChange={onChange}
      required
    />
  )
}

const Submit = ({ text }) => (
  <input className="loginInput loginSubmit" type="submit" value={text} />
)


export default LoginForm;
