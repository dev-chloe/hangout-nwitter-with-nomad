import { authService } from "utils/fBase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
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
      if (newAccount) {
        // create accout
        await createUserWithEmailAndPassword(
          authService, email, password
        )
      } else {
        // login
        await signInWithEmailAndPassword(
          authService, email, password
        )
      }
    } catch (e) {
      setError(e.message);
    }
  }
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  }
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="loginInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="loginInput"
        />
        <input type="submit" className="loginInput loginSubmit" value={newAccount ? "Create Account" : "Login"} />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="loginSwitch">{newAccount ? "Sign In" : "Create Account"}</span>
    </>
  )
}

export default LoginForm;
