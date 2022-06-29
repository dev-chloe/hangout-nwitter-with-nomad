import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./AttachmentButton.module.css";

const AttachmentButton = ({ fileInput, setNweetImage }) => {
  const onFileChange = (event) => {
    const { target: { files } } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent;
      setNweetImage(result);
    };
    reader.readAsDataURL(theFile);
  };
  return (
    <>
      <label htmlFor="attach-file" className={style.label}>
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
        className={style.not_view}
      />
    </>
  );
};

export default AttachmentButton;