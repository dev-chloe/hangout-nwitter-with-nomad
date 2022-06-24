import { useRef, useState } from "react";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NweetWritter.css";

const NweetWritter = ({ userObj }) => {
  const [nweetText, setNweetText] = useState("");
  const [nweetImage, setNweetImage] = useState(null);
  const onSubmit = () => {

  }
  return (
    <form className="nweet_writter_form" onSubmit={onSubmit}>
      <div className="nweet_writter_input_container">
        <TextInput nweetText={nweetText} setNweetText={setNweetText} />
        <SubmitButton />
      </div>
      <ImageInput nweetImage={nweetImage} setNweetImage={setNweetImage} />
    </form>
  )
}

const TextInput = ({ nweetText, setNweetText }) => {
  const onChange = (event) => {
    const { target: { value } } = event;
    setNweetText(value);
  }
  return (
    <input
      className="nweet_writter_input"
      value={nweetText}
      onChange={onChange}
      type="text"
      placeholder="What's on your mind?"
      maxLength={120}
    />
  )
}

const SubmitButton = () => (
  <input type="submit" value="&rarr;" className="nweet_writter_input_arrow" />
)

const ImageInput = ({ nweetImage, setNweetImage }) => {
  const fileInput = useRef();
  const onFileChange = (event) => {
    const { target: { files } } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent;
      setNweetImage(result);
    }
    reader.readAsDataURL(theFile);
  }
  return (
    <>
      <label htmlFor="attach-file" className="nweet_writter_input_label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
        style={{
          opacity: 0,
        }}
      />
      {nweetImage && <ImagePreview nweetImage={nweetImage} setNweetImage={setNweetImage} fileInput={fileInput} />}
    </>
  )
}

const ImagePreview = ({ nweetImage, setNweetImage }) => {
  const onClearAttachment = () => {
    setNweetImage(null);
    fileInput.current.value = null;
  };
  return (
    <div className="nweet_writter_form_attachment" >
      <img src={nweetImage} alt="img" style={{ backgroundImage: nweetImage, }} />
      <button className="nweet_writter_form_clear" onClick={onClearAttachment}>
        <span>Remove</span>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  )
}

export default NweetWritter;