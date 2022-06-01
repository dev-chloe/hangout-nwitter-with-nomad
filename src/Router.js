import Navigation from "components/Navigation";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

const Router = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <HashRouter>
      <Navigation userObj={userObj} />
      <Routes>
        {isLoggedIn ?
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
          </>
          :
          <>
            <Route path="/" element={<Auth />} />
          </>
        }
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </HashRouter>
  )
}

export default Router;