import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import style from "./Attachment.module.scss";


const Attachment = ({ nweetImage, setNweetImage, fileInput }) => {
  const onClearAttachment = () => {
    setNweetImage("");
    fileInput.current.value = null;
  };
  return (
    <div className={style.attachment}>
      <img src={nweetImage} alt="img" style={{ backgroundImage: nweetImage }} />
      <button className={style.form_clear} onClick={onClearAttachment}>
        <span>Remove</span>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

Attachment.propTypes = {
  nweetImage: PropTypes.string.isRequired,
  setNweetImage: PropTypes.func.isRequired,
  fileInput: PropTypes.object.isRequired
};

export default Attachment;