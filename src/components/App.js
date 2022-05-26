import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { getAuth } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setisLoggedIn(true);
        setUserObj(user);
      } else {
        setisLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
