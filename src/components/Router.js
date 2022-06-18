import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "routes/Login";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const Router = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <HashRouter>
      <Navigation displayName={userObj && userObj.displayName} />
      <Routes>
        {isLoggedIn ?
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
          </>
          :
          <>
            <Route path="/" element={<Login />} />
          </>
        }
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </HashRouter>
  )
}

export default Router;