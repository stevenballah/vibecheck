import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../includes/UserContext";
import default_profile_pic from "../images/user.png";
import dateformat from "dateformat";
import { getAllUsers } from "../includes/repository";

export default function Explore() {
  const { userInfo } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  //FORMAT THE DATE FROM DATABASE
  function formatDate() {
    const formatDate = dateformat(userInfo.account_created, "mmmm dS, yyyy");
    return formatDate;
  }

  const fetchAllUsers = async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers);
  };

  useEffect(() => {
    fetchAllUsers();
    console.log(users);
  }, []);

  return (
    <div className="row position-relative overflow-hidden p-3">
      <div className="container bg-light rounded">
        <div className="row bg-light rounded">
          <h2 className="pl-4 pt-4">Who to follow</h2>
        </div>

        {Object.entries(users).length === 0 ? (
          <div className="loading-posts bg-light rounded p-3 text-center">
            <h5>Loading users</h5>
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          users.map((user, index) => {
            return (
              <div className="user" key={index}>
                <div className="row mx-1 bg-light mt-3 mb-3">
                  <div className="col-sm-2 col-md-2 col-lg-1">
                    <img
                      src={user.profile_pic_url ? user.profile_pic_url : default_profile_pic}
                      alt="user"
                      className="w-100 profile-pic"
                    ></img>
                  </div>
                  <p className="mb-0 my-auto">{user.firstname} {user.lastname}</p>
                  <button
                    type="button"
                    class="btn btn-primary mb-0 my-auto ml-auto"
                  >
                    Follow
                  </button>
                </div>
                <hr className="mb-0 mt-0"></hr>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
