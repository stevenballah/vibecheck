import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../includes/UserContext";
import user from "../images/user.png";
import dateformat from "dateformat";

export default function Profile() {
  const { userInfo } = useContext(UserContext);

  console.log(userInfo);

  //FORMAT THE DATE FROM DATABASE
  function formatDate() {
    const formatDate = dateformat(userInfo.account_created, "mmmm dS, yyyy");
    return formatDate;
  }

  return (
    <div className="row position-relative overflow-hidden p-3 p-md-5 m-md-3">
      <div className="container">
        <div className="card">
          <div className="card-title mb-0">
            <h2 className="pl-4 pt-2 mt-2">My Profile</h2>
            <hr className="mx-4"></hr>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                {userInfo.profile_pic_url ? (
                  <img
                    src={userInfo.profile_pic_url}
                    alt="user"
                    className="w-100 profile-pic"
                  ></img>
                ) : (
                  <img src={user} alt="user" className="w-100"></img>
                )}
              </div>
              <div className="col-sm-6">
                <p className="mb-0 font-weight-bold">Full Name</p>
                <p className="mb-0">
                  {userInfo.firstname} {userInfo.lastname}
                </p>
                <hr></hr>
                <p className="mb-0 font-weight-bold">Email address</p>
                <p className="mb-0">{userInfo.email}</p>
                <hr></hr>
                <p className="mb-0 font-weight-bold">Account created</p>
                <p className="mb-0">{formatDate()}</p>
                <hr></hr>
                <Link to="/settings" className="btn btn-primary">
                  <i className="fas fa-cog mr-1"></i>
                  Profile Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
