import React, { useContext } from "react";
import logo from "../images/vibecheck-svg.svg";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

export default function Nav() {
  const { userInfo, logoutUser, currentUser } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm border-bottom ">
      <Link to="/" className="nav-link">
        <img className="logo" src={logo} alt="VIBECHECK"></img>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
        </ul>
        {currentUser === null ? (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/forum/posts" className="nav-link">
                Forum
              </Link>
            </li>
            <li className="nav-item dropdown d-none d-lg-block">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="/profile"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                {userInfo.email}{" "}
              </a>
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  <i className="fas fa-user-alt mr-1"></i>
                  Profile
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <i className="fas fa-cog mr-1"></i>
                  Settings
                </Link>
                <div role="separator" className="dropdown-divider"></div>
                <Link
                  to="/login"
                  onClick={logoutUser}
                  className="dropdown-item text-danger"
                >
                  <i className="fas fa-sign-out-alt mr-1"></i>
                  Logout
                </Link>
              </div>
            </li>
            <li className="nav-item mx-lg-3 d-block d-lg-none">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <Link to="/settings" className="nav-link">
                Settings
              </Link>
              <Link
                to="/login"
                onClick={logoutUser}
                className="nav-link text-danger"
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
