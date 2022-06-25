import { useState } from "react";
import style from "./LoginForm.module.css";
import AuthService from "services/AuthService/AuthService";

const LoginForm = () => {
  const [isNewAccount, setIsNewAccount] = useState(true);
  const toggleForm = () => {
    setIsNewAccount((prev) => !prev);
  }
  return (
    <Form isNewAccount={isNewAccount} toggleForm={toggleForm} />
  )
}

const Form = ({ isNewAccount, toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      if (isNewAccount) {
        AuthService.signUp({ email, password });
      } else {
        AuthService.login({ email, password });
      }
    } catch (e) {
      setError(e.message);
    }
  }
  return (
    <form onSubmit={onSubmit} className={`container ${style.wrapper}`}>
      <Input type="email" onChange={onChange} placeholder="Email" />
      <Input type="password" onChange={onChange} placeholder="Password" />
      <ToggleBtn type="submit" classNm={`${style.input} ${style.submit}`} text={isNewAccount ? "Create Account" : "Login"} />
      {error && <span className={style.error}>{error}</span>}
      <ToggleBtn type="button" classNm={style.switch} toggleForm={toggleForm} text={isNewAccount ? "Sign In" : "Create Account"} />
    </form>
  )
}

const Input = ({ type, placeholder, onChange }) => {
  return (
    <input
      className={style.input}
      name={type}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required
    />
  )
}
const ToggleBtn = ({ toggleForm, text, classNm, type }) => (
  <input type={type} className={classNm} value={text} onClick={toggleForm && toggleForm} />
)

export default LoginForm;