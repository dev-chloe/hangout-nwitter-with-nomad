import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "utils/fBase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import style from "./Nweet.module.css";


const Nweet = ({ nweetObj, isOwned }) => {
  const [editing, setEditing] = useState(false);
  const toggleEditing = () => {
    setEditing(prev => !prev);;
  }

  const [nweetText, setNweetText] = useState(nweetObj.text);
  const nweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(nweetTextRef, {
      text: nweetText,
    });
    setEditing(false);
  }
  const onChange = (event) => {
    const { target: { value } } = event;
    setNweetText(value);
  }

  const editModeData = {
    toggleEditing,
    onChange,
    onSubmit,
    nweetText,
  }
  const displayModeData = {
    isOwned,
    toggleEditing,
    nweetTextRef,
    nweetText,
    nweetImgUrl: nweetObj.attachmentUrl
  }

  return (
    <div className={`${style.nweet} ${nweetObj.attachmentUrl && style.mg_b35}`}>
      {
        editing && isOwned
          ? <NweeEditMode editProps={editModeData} />
          : <NweetDisplayMode displayProps={displayModeData} />
      }
    </div >
  )
}

const NweeEditMode = ({ editProps }) => {
  const { toggleEditing, onChange, onSubmit, nweetText } = editProps;
  return (
    <>
      <form onSubmit={onSubmit} className={`container ${style.nweet_edit}`}>
        <input
          type="text"
          placeholder="Edit your nweet"
          value={nweetText}
          onChange={onChange}
          required
        />
        <input type="submit" value="Update Nweet" className="form_btn" />
      </form>
      <button onClick={toggleEditing} className={`form_btn cancel_btn`}>Cancel</button>
    </>
  )
}

const NweetDisplayMode = ({ displayProps }) => {
  const { isOwned, toggleEditing, nweetTextRef, nweetText, nweetImgUrl } = displayProps;
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      // delete nweet
      await deleteDoc(nweetTextRef);
      if (nweetImgUrl) {
        await deleteObject(ref(storageService, nweetImgUrl));
      }
    }
  }
  return (
    <>
      <h4>{nweetText}</h4>
      {nweetImgUrl && <img src={nweetImgUrl} alt="img" />}
      {isOwned &&
        <div className={style.nweet_actions}>
          <ActionBtn action="delete" clickFn={onDeleteClick} />
          <ActionBtn action="rewrite" clickFn={toggleEditing} />
        </div>}
    </>
  )
}

const ActionBtn = ({ action, clickFn }) => {
  let btnIcon = null;
  switch (action) {
    case 'delete':
      btnIcon = <FontAwesomeIcon icon={faTrash} />
      break;
    case 'rewrite':
      btnIcon = <FontAwesomeIcon icon={faPencilAlt} />
      break;
  }
  return (
    <button onClick={clickFn}>{btnIcon}</button>
  )
}

export default Nweet;
