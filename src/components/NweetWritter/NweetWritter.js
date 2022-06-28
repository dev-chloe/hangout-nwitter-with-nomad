import { useRef, useState } from "react";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NweetWritter.css";
import NweetService from "services/NweetService";

const NweetWritter = ({ userObj }) => {
  const [nweetText, setNweetText] = useState("");
  const [nweetImage, setNweetImage] = useState(null);
  const writeNewNweet = async (event) => {
    event.preventDefault();
    if (nweetText === "") {
      return;
    }
    NweetService.addNewNweet(
      { nweetText, nweetImage, uid: userObj.uid },
      () => {
        setNweetText("");
        setNweetImage(null);
      },
    );
  }
  return (
    <form className="nweet_writter_form" onSubmit={writeNewNweet}>
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
  // 부모 nweetImage state가 비워지면 input의 기존 값을 초기화한다.
  if (!nweetImage && fileInput.current) {
    fileInput.current.value = null;
  }

  const uploadAttachment = (event) => {
    const { target: { files } } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent;
      setNweetImage(result);
    }
    reader.readAsDataURL(theFile);
  }

  const clearAttachment = () => {
    setNweetImage(null);
    fileInput.current.value = null;
  };

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
        ref={fileInput}
        onChange={uploadAttachment}
        style={{
          opacity: 0,
        }}
      />
      {nweetImage && <ImagePreview nweetImage={nweetImage} clearAttachment={clearAttachment} />}
    </>
  )
}

const ImagePreview = ({ nweetImage, clearAttachment }) => (
  <div className="nweet_writter_form_attachment" >
    <img src={nweetImage} alt="img" style={{ backgroundImage: nweetImage, }} />
    <button className="nweet_writter_form_clear" onClick={clearAttachment}>
      <span>Remove</span>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  </div>
)

export default NweetWritter;