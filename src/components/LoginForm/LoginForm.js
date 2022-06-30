import { useState } from "react";
import PropTypes from "prop-types";
import AuthService from "services/AuthService";
import style from "./LoginForm.module.scss";

const LoginForm = () => {
  const [isNewAccount, setIsNewAccount] = useState(true);
  const toggleForm = () => {
    setIsNewAccount((prev) => !prev);
  };
  return (
    <Form isNewAccount={isNewAccount} toggleForm={toggleForm} />
  );
};

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
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (isNewAccount) {
      AuthService.signUp({ email, password }, setError);
    } else {
      AuthService.login({ email, password }, setError);
    }
  };
  
  return (
    <form onSubmit={onSubmit} className={`container ${style.wrapper}`}>
      <Input type="email" onChange={onChange} placeholder="Email" />
      <Input type="password" onChange={onChange} placeholder="Password" />
      <ToggleButton type="submit" classNm={`${style.input} ${style.submit}`} text={isNewAccount ? "Create Account" : "Login"} />
      {error && <span className={style.error}>{error}</span>}
      <ToggleButton type="button" classNm={style.switch} toggleForm={toggleForm} text={isNewAccount ? "Sign In" : "Create Account"} />
    </form>
  );
};

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
  );
};

const ToggleButton = ({ toggleForm, text, classNm, type }) => (
  <input type={type} className={classNm} value={text} onClick={toggleForm && toggleForm} />
);

Form.propTypes = {
  isNewAccount: PropTypes.bool.isRequired,
  toggleForm: PropTypes.func.isRequired
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

ToggleButton.propTypes = {
  toggleForm: PropTypes.func,
  text: PropTypes.string.isRequired,
  classNm: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default LoginForm;
