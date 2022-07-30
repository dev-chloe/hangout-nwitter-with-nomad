import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "Router";
import AuthService from "services/AuthService";
import { userLogout, userUpdate } from "services/AuthService/userSlice";

function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useSelector((state)=> state.user);
  const dispatch = useDispatch();

  const refreshUser = useCallback(() => {
    AuthService.refresh((refreshedUser) => {
      setIsReady(true);
      if (refreshedUser) {
        setisLoggedIn(true);
        const userPayload = {
          displayName: refreshedUser.displayName ?? refreshedUser.email.split("@")[0],
          uid: refreshedUser.uid,
          email: refreshedUser.email
        };
        dispatch(userUpdate(userPayload));
        return;
      }
      setisLoggedIn(false);
      dispatch(userLogout());
    });
  }, []);
  useEffect(() => {
    refreshUser();
  }, []);
  return (
    <div className="wrapper">
      <div className="contents_wrapper">
        {isReady ?
          <Router
            refreshUser={refreshUser}
            isLoggedIn={isLoggedIn}
          />
          :
          "Initializing..."
        }
        <footer>&copy; {new Date().getFullYear()} Nwitter by
          <a href="https://github.com/dev-chloe/hangout-nwitter-with-nomad#project" target="_blank" rel="noreferrer"> Chloe</a>
        </footer>
      </div>
    </div>
  );
}

export default App;
