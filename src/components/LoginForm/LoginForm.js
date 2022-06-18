import { authService } from "fBase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

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
          className="login_input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="login_input"
        />
        <input type="submit" className="login_input login_submit" value={newAccount ? "Create Account" : "Login"} />
        {error && <span className="login_error">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="login_switch">{newAccount ? "Sign In" : "Create Account"}</span>
    </>
  )
}

export default LoginForm;