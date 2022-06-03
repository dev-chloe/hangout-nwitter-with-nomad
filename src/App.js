import { useEffect, useState } from "react";
import Router from "Router";
import { updateProfile } from "firebase/auth";
import AuthService from "services/AuthService";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    AuthService.refresh((user) => {
      setInit(true);
      if (user) {
        setisLoggedIn(true);
        setUserObj({
          displayName: user.displayName ?? user.email.split("@")[0],
          uid: user.uid,
          email: user.email,
          updateProfile: () => updateProfile(user, {
            displayName: user.displayName
          }),
        });
        return;
      }
      setisLoggedIn(false);
      setUserObj(null);
    });
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
