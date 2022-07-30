import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Login from "routes/Login";
import Navigation from "components/Navigation";

const Router = ({ refreshUser, isLoggedIn }) => {
  return (
    <HashRouter>
      <Navigation />
      <Routes>
        {isLoggedIn ?
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile refreshUser={refreshUser} />} />
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
  isLoggedIn: PropTypes.bool.isRequired
};

export default Router;
