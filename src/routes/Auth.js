import { authService } from "fBase";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";

import BasicUserSerivce from "../services/user/BasicUserService"

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const { target: { name, value } } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }
  const toggleNewAccount = () => {
    setNewAccount((prev) => !prev);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const userData = { email, password };
    const resultMsg = isNewAccount
      ? await BasicUserSerivce.join(userData)
      : await BasicUserSerivce.login(userData);
    if (resultMsg) {
      setError(resultMsg);
    }
  }
  
  const onSocialClick = async (event) => {
    const { target: { name } } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          required 
          value={email} 
          onChange={onChange}
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          required 
          value={password} 
          onChange={onChange}
        />
        <input type="submit" value={isNewAccount ? "Create Account" : "Login"} />
        {error}
      </form>
      <span onClick={toggleNewAccount}>{isNewAccount ? "Sign In" : "Create Account"}</span>
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with Github</button>
      </div>
    </div>
  );
} 

export default Auth;