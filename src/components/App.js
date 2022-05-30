import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { getAuth, updateProfile } from "firebase/auth";
import { authService } from "fBase";

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
          displayName: user.displayName,
          uid: user.uid,
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
      updateProfile: () => updateProfile(user, {
        displayName: authService.currentUser.displayName
      })
    });
  }
  return (
    <>
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
    </>
  );
}

export default App;
