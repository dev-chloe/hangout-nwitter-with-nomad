import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "utils/fBase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const nweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      // delete nweet
      await deleteDoc(nweetTextRef);
      if (nweetObj.attachmentUrl) {
        await deleteObject(ref(storageService, nweetObj.attachmentUrl));
      }
    }
  }
  const toggleEditing = () => {
    setEditing(prev => !prev);;
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(nweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  }
  const onChange = (event) => {
    const { target: { value } } = event;
    setNewNweet(value);
  }
  return (
    <div className="nweet">
      {
        editing ? (
          <>
            {
              isOwner && (
                <>
                  <form onSubmit={onSubmit} className="container nweetEdit">
                    <input
                      type="text"
                      placeholder="Edit your nweet"
                      value={newNweet}
                      required
                      onChange={onChange}
                    />
                    <input type="submit" value="Update Nweet" className="formBtn" />
                  </form>
                  <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                </>
              )
            }
          </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} alt="img" width="300px" />}
            {isOwner && (
              <div className="nweet__actions">
                <button onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              </div>
            )}
          </>
        )
      }
    </div>
  )
}

export default Nweet;
