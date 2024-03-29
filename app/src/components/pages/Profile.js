import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../includes/UserContext";
import user from "../images/user.png";
import dateformat from "dateformat";
import { getUserFollowers, getUsersFollowing } from "../includes/repository";

export default function Profile() {
  const { userInfo } = useContext(UserContext);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  //FORMAT THE DATE FROM DATABASE
  function formatDate() {
    const formatDate = dateformat(userInfo.account_created, "mmmm dS, yyyy");
    return formatDate;
  }

  async function fetchFollowers() {
    const followers = await getUserFollowers(userInfo.user_id);
    if (followers) {
      setFollowers(followers);
    }
  }

  async function fetchFollowing() {
    const following = await getUsersFollowing(userInfo.user_id);
    if (following) {
      setFollowing(following);
    }
  }

  useEffect(() => {
    fetchFollowers();
    fetchFollowing();
  }, []);

  return (
    <div className="row position-relative overflow-hidden p-3 p-md-5 m-md-3">
      <div className="container">
        <div className="card">
          <div className="card-title mb-0">
            <h2 className="pl-4 pt-2 mt-2">My Profile</h2>
            <hr className="mx-4"></hr>
          </div>
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="profile-image">
                {userInfo.profile_pic_url ? (
                  <div className="profile-pic">
                    <img
                      src={userInfo.profile_pic_url}
                      alt="user"
                      className="w-100 shadow-md"
                    ></img>
                  </div>
                ) : (
                  <img src={user} alt="user" className="w-100"></img>
                )}
              </div>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-sm-6">
                <div className="row text-center">
                  <div className="col">
                    <p className="mb-0 font-weight-bold">Followers</p>
                    <p className="display-4">{followers.length}</p>
                  </div>
                  <div className="col">
                    <p className="mb-0 font-weight-bold">Following</p>
                    <p className="display-4">{following.length}</p>
                  </div>
                </div>
                <hr></hr>
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
