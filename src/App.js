import { useEffect, useState } from "react";
import AppRouter from "Router";
import { getAuth, updateProfile } from "firebase/auth";
import { authService } from "utils/fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setisLoggedIn(true);
        setUserObj({
          displayName: user.displayName ?? user.email.split("@")[0],
          uid: user.uid,
          email: user.email,
          updateProfile: () => updateProfile(user, {
            displayName: user.displayName
          })
        });
      } else {
        setisLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  const refreshUser = () => {
    setUserObj({
      displayName: authService.currentUser.displayName,
      uid: authService.currentUser.uid,
      email: user.email,
      updateProfile: () => updateProfile(user, {
        displayName: authService.currentUser.displayName
      })
    });
  }
  return (
    <div className="wrapper">
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) :
        "Initializing..."
      }
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
