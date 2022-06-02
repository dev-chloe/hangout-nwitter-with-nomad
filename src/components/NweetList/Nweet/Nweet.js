import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "utils/fBase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import "./Nweet.css";

const Nweet = ({ nweetObj, isOwned }) => {
  // Edit
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditMode = () => {
    setIsEditing(prev => !prev);
  }

  // NweetText
  const [nweetText, setNweetText] = useState(nweetObj.text);
  const nweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
  const saveNweet = async (event) => {
    event.preventDefault();
    await updateDoc(nweetTextRef, { text: nweetText });
    setIsEditing(false);
  }
  const updateNweetText = (event) => {
    const { target: { value } } = event;
    setNweetText(value);
  }

  // Edit/Display mode data
  const editModeData = {
    saveNweet,
    nweetText,
    updateNweetText,
    cancle: toggleEditMode,
  }
  const displayModeData = {
    isOwned,
    nweetTextRef,
    toggleEditMode,
    nweetText,
    nweetImgUrl: nweetObj.attachmentUrl,
  }

  return (
    <div className="nweet">
      {isEditing && isOwned
        ? <NweetEditMode editProps={editModeData} />
        : <NweetDisplayMode displayProps={displayModeData} />
      }
    </div>
  )
}

const NweetEditMode = ({ editProps }) => {
  const { saveNweet, nweetText, updateNweetText, cancle } = editProps;
  return (
    <>
      <form className="container nweet_edit" onSubmit={saveNweet}>
        <input
          type="text"
          placeholder="Edit your nweet"
          value={nweetText}
          required
          onChange={updateNweetText}
        />
        <input className="form_btn" type="submit" value="Update Nweet" />
      </form>
      <button className="form_btn cancelBtn" onClick={cancle}>Cancel</button>
    </>
  )
}

const NweetDisplayMode = ({ displayProps }) => {
  const { isOwned, nweetText, nweetImgUrl, nweetTextRef, toggleEditMode } = displayProps;
  return (
    <>
      <h4>{nweetText}</h4>
      {nweetImgUrl &&
        <img src={nweetImgUrl} alt="img" width="300px" />
      }
      {isOwned &&
        <NweetActionBox
          nweetTextRef={nweetTextRef}
          nweetImgUrl={nweetImgUrl}
          clickToEdit={toggleEditMode}
        />
      }
    </>
  )
}

const NweetActionBox = ({ nweetTextRef, nweetImgUrl, clickToEdit }) => {
  const deleteNweet = async () => {
    const isConfirm = window.confirm("Are you sure you want to delete this nweet?");
    if (isConfirm) {
      await deleteDoc(nweetTextRef);
      if (nweetImgUrl) {
        await deleteObject(ref(storageService, nweetImgUrl));
      }
    }
  }
  return (
    <div className="nweet_actions">
      <button onClick={deleteNweet}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button onClick={clickToEdit}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </button>
    </div>
  )
}


export default Nweet;
