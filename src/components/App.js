import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { getAuth } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(function (user) {
      console.log(user)
      if (user) {
        setisLoggedIn(true);
      } else {
        setisLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
