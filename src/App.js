import { useEffect, useState } from "react";
import AppRouter from "Router";
import { updateProfile } from "firebase/auth";
import { authService } from "utils/fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    refreshUser();
  }, [])
  const refreshUser = () => {
    authService.onAuthStateChanged(function (user) {
      setInit(true);
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
        return
      }
      setisLoggedIn(false);
      setUserObj(null);
    })
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
