import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "utils/fBase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import style from "./NweetFactory.module.css";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();
  const onSubmit = async (event) => {
    if (nweet === "") {
      return;
    }
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    })
    setNweet("");
    setAttachment("");
    fileInput.current.value = null;
  }
  const onChange = (event) => {
    const { target: { value } } = event;
    setNweet(value);
  }
  return (
    <>
      <form onSubmit={onSubmit} className={style.form}>
        <InputContainer nweet={nweet} onChange={onChange} />
        <AttachmentBtn fileInput={fileInput} setAttachment={setAttachment} />
        <input type="submit" value="Nweet" />
        {
          attachment &&
          <Attachment
            attachment={attachment}
            setAttachment={setAttachment}
            fileInput={fileInput}
          />
        }
      </form>
    </>
  )
}

const InputContainer = ({ nweet, onChange }) => {
  return (
    <div className={style.input_container}>
      <input
        className={style.input}
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="submit" value="&rarr;" className={style.arrow} />
    </div>
  )
}

const AttachmentBtn = ({ fileInput, setAttachment }) => {
  const onFileChange = (event) => {
    const { target: { files } } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent;
      setAttachment(result);
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

const Attachment = ({ attachment, setAttachment, fileInput }) => {
  const onClearAttachment = () => {
    setAttachment("");
    fileInput.current.value = null;
  };
  return (
    <div className={style.attachment} >
      <img src={attachment} alt="img" style={{ backgroundImage: attachment, }} />
      <button className={style.form_clear} onClick={onClearAttachment}>
        <span>Remove</span>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  )
}

export default NweetFactory