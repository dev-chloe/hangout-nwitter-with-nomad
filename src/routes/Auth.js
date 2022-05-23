import { useState } from "react";

import BasicUserSerivce from "services/user/BasicUserService"
import SocialUserService, { socialBtnName } from "services/user/SocialUserService";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewAccount, setIsNewAccount] = useState(true);
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
    setIsNewAccount((prev) => !prev);
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
    await SocialUserService.login(name);
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
        <button name={socialBtnName.google} onClick={onSocialClick}>Continue with Google</button>
        <button name={socialBtnName.github} onClick={onSocialClick}>Continue with Github</button>
        <button name="instagram" onClick={onSocialClick}>Continue with Instagram (not implemented)</button>
      </div>
    </div>
  );
} 

export default Auth;