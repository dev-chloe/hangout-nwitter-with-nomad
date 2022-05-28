import { authService, dbService } from "fBase";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";

const Profile = ({userObj}) => {
  const onLogoutClikc = () => {
    authService.signOut();
  }
  const getMyNweets = async () => {
    const q = query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"));
    onSnapshot(q, snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      console.log(nweetArray)
    })
  }
  useEffect(() => {
    getMyNweets();
  }, [])
  return (
    <>
      <button onClick={onLogoutClikc}>Logout</button>
    </>
  )
};

export default Profile;