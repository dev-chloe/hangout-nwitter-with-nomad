import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "utils/fBase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import style from "./NweetFactory.module.css";
import NweetService from "services/NweetService/NweetService";

const NweetFactory = ({ userObj }) => {
  const [nweetText, setNweetText] = useState("");
  const [nweetImage, setNweetImage] = useState("");
  const fileInput = useRef();
  const onSubmit = async (event) => {
    if (nweetText === "") {
      return;
    }
    event.preventDefault();
    NweetService.addNewNweet(
      { uid: userObj.uid, nweetText, nweetImage },
      () => {
        setNweetText("");
        setNweetImage("");
        fileInput.current.value = null;
      }
    )
  }
  return (
    <>
      <form onSubmit={onSubmit} className={style.form}>
        <InputContainer nweetText={nweetText} setNweetText={setNweetText} />
        <AttachmentBtn fileInput={fileInput} setNweetImage={setNweetImage} />
        <input type="submit" value="Nweet" />
        {
          nweetImage &&
          <Attachment
            nweetImage={nweetImage}
            setNweetImage={setNweetImage}
            fileInput={fileInput}
          />
        }
      </form>
    </>
  )
}

const InputContainer = ({ nweetText, setNweetText }) => {
  const onChange = (event) => {
    const { target: { value } } = event;
    setNweetText(value);
  }
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
  )
}

const AttachmentBtn = ({ fileInput, setNweetImage }) => {
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
  )
}

const Attachment = ({ nweetImage, setNweetImage, fileInput }) => {
  const onClearAttachment = () => {
    setNweetImage("");
    fileInput.current.value = null;
  };
  return (
    <div className={style.attachment} >
      <img src={nweetImage} alt="img" style={{ backgroundImage: nweetImage, }} />
      <button className={style.form_clear} onClick={onClearAttachment}>
        <span>Remove</span>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  )
}

export default NweetFactory