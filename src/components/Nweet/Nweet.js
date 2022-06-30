import { useState } from "react";
import PropTypes from "prop-types";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NweetService from "services/NweetService";
import style from "./Nweet.module.scss";

const Nweet = ({ nweetObj, isOwned }) => {
  const [editing, setEditing] = useState(false);
  const toggleEditing = () => {
    setEditing(prev => !prev);
  };

  const [nweetText, setNweetText] = useState(nweetObj.text);
  const nweet = NweetService.getNweet({ id: nweetObj.id });
  const submitEdittedNweet = async (event) => {
    event.preventDefault();
    NweetService.editNweet({ nweetText, nweet }, () => setEditing(false));
  };
  const typeToEditNweet = (event) => {
    const { target: { value } } = event;
    setNweetText(value);
  };

  const editModeData = {
    toggleEditing,
    typeToEditNweet,
    submitEdittedNweet,
    nweetText
  };
  const displayModeData = {
    isOwned,
    toggleEditing,
    nweet,
    nweetText,
    nweetImgUrl: nweetObj.attachmentUrl
  };
  return (
    <div className={style.nweet}>
      {
        editing && isOwned
          ? <NweeEditMode editProps={editModeData} />
          : <NweetDisplayMode displayProps={displayModeData} />
      }
    </div >
  );
};

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
      <button onClick={toggleEditing} className={"form_btn cancel_btn"}>Cancel</button>
    </>
  );
};

const NweetDisplayMode = ({ displayProps }) => {
  const { isOwned, toggleEditing, nweet, nweetText, nweetImgUrl } = displayProps;
  const onDeleteClick = async () => {
    const confirmedRemoveNweet = window.confirm("Are you sure you want to delete this nweet?");
    if (confirmedRemoveNweet) {
      NweetService.removeNweet(nweet, nweetImgUrl);
    }
  };
  return (
    <>
      <h4>{nweetText}</h4>
      {nweetImgUrl && <img src={nweetImgUrl} alt="img" />}
      {isOwned &&
        <div className={style.nweet_actions}>
          <ActionButton action="delete" clickFn={onDeleteClick} />
          <ActionButton action="rewrite" clickFn={toggleEditing} />
        </div>}
    </>
  );
};

const ActionButton = ({ action, clickFn }) => {
  const buttonIcon = getActionButtonIcon(action);
  return (buttonIcon) && (
    <button onClick={clickFn}>{buttonIcon}</button>
  );
};

const getActionButtonIcon = (action) => {
  switch (action) {
  case "delete":
    return <FontAwesomeIcon icon={faTrash} />;
  case "rewrite":
    return <FontAwesomeIcon icon={faPencilAlt} />;
  default:
    console.warn(`no actionIcon implementations: ${action}`);
    return null;
  }
};

Nweet.propTypes = {
  nweetObj: PropTypes.object.isRequired,
  isOwned: PropTypes.bool.isRequired
};

NweeEditMode.propTypes = {
  editProps: PropTypes.object.isRequired
};

NweetDisplayMode.propTypes = {
  displayProps: PropTypes.object.isRequired
};

ActionButton.propTypes = {
  action: PropTypes.string.isRequired,
  clickFn: PropTypes.func.isRequired
};


export default Nweet;
