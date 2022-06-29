import PropTypes from "prop-types";
import style from "./InputContainer.module.css";

const InputContainer = ({ nweetText, setNweetText }) => {
  const onChange = (event) => {
    const { target: { value } } = event;
    setNweetText(value);
  };
  return (
    <div className={style.input_container}>
      <input
        className={style.input}
        value={nweetText}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="submit" value="&rarr;" className={style.arrow} />
    </div>
  );
};

InputContainer.propTypes = {
  nweetText: PropTypes.string.isRequired,
  setNweetText: PropTypes.func.isRequired
};

export default InputContainer;