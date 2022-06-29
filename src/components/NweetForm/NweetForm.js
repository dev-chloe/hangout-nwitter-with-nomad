import { useRef, useState } from "react";
import NweetService from "services/NweetService";
import InputContainer from "./InputContainer";
import AttachmentButton from "./AttachmentButton";
import Attachment from "./Attachment";
import style from "./NweetForm.module.css";

const NweetForm = ({ userObj }) => {
  const [nweetText, setNweetText] = useState("");
  const [nweetImage, setNweetImage] = useState("");
  const fileInput = useRef();
  
  const updateNewNweet = async (event) => {
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
    );
  };

  return (
    <>
      <form onSubmit={updateNewNweet} className={style.form}>
        <InputContainer nweetText={nweetText} setNweetText={setNweetText} />
        <AttachmentButton fileInput={fileInput} setNweetImage={setNweetImage} />
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
  );
};

export default NweetForm;