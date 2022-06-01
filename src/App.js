import { useEffect, useState } from "react";
import Router from "Router";
import { updateProfile } from "firebase/auth";
import { authService } from "utils/fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const refreshUser = () => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setisLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: () => updateProfile(user, {
            displayName: user.displayName
          })
        });
      } else {
        setisLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    })
  }
  useEffect(() => {
    refreshUser();
  }, [])
  return (
    <div
      style={{
        maxWidth: 890,
        width: "100%",
        margin: "0 auto",
        marginTop: 80,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {init ? (
        <>
          <Router
            refreshUser={refreshUser}
            isLoggedIn={isLoggedIn}
            userObj={userObj}
          />
        </>
      ) :
        "Initializing..."
      }
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
