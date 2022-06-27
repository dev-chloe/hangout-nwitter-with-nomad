import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import style from "./Nweet.module.css";
import NweetService from "services/NweetService/NweetService";

const Nweet = ({ nweetObj, isOwned }) => {
  const [editing, setEditing] = useState(false);
  const toggleEditing = () => {
    setEditing(prev => !prev);;
  }

  const [nweetText, setNweetText] = useState(nweetObj.text);
  const nweet = NweetService.getNweet({ id: nweetObj.id });
  const submitEdittedNweet = async (event) => {
    event.preventDefault();
    NweetService.editNweet({ nweetText, nweet }, () => setEditing(false));
  }
  const typeToEditNweet = (event) => {
    const { target: { value } } = event;
    setNweetText(value);
  }

  const editModeData = {
    toggleEditing,
    typeToEditNweet,
    submitEdittedNweet,
    nweetText,
  }
  const displayModeData = {
    isOwned,
    toggleEditing,
    nweet,
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
  const { toggleEditing, typeToEditNweet, submitEdittedNweet, nweetText } = editProps;
  return (
    <>
      <form onSubmit={submitEdittedNweet} className={`container ${style.nweet_edit}`}>
        <input
          type="text"
          placeholder="Edit your nweet"
          value={nweetText}
          onChange={typeToEditNweet}
          required
        />
        <input type="submit" value="Update Nweet" className="form_btn" />
      </form>
      <button onClick={toggleEditing} className={`form_btn cancel_btn`}>Cancel</button>
    </>
  )
}

const NweetDisplayMode = ({ displayProps }) => {
  const { isOwned, toggleEditing, nweet, nweetText, nweetImgUrl } = displayProps;
  const onDeleteClick = async () => {
    const confirmedRemoveNweet = window.confirm("Are you sure you want to delete this nweet?");
    if (confirmedRemoveNweet) {
      NweetService.removeNweet(nweet, nweetImgUrl);
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
