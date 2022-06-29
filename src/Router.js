import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Login from "routes/Login";
import Navigation from "components/Navigation";

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
          <Route path="/" element={<Login />} />
        }
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </HashRouter>
  );
};

Router.propTypes = {
  refreshUser: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userObj:  PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired])
};

export default Router;
