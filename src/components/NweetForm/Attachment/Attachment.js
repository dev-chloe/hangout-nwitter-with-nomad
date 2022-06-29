import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Attachment.module.css";


const Attachment = ({ nweetImage, setNweetImage, fileInput }) => {
  const onClearAttachment = () => {
    setNweetImage("");
    fileInput.current.value = null;
  };
  return (
    <div className={style.attachment} >
      <img src={nweetImage} alt="img" style={{ backgroundImage: nweetImage }} />
      <button className={style.form_clear} onClick={onClearAttachment}>
        <span>Remove</span>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default Attachment;