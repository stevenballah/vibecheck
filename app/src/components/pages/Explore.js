import React, { useContext, useEffect, useState } from "react";
import default_profile_pic from "../images/user.png";
import {
  getAllUsers,
  followUser,
  getUsersFollowing,
  unfollowUser
} from "../includes/repository";
import UserContext from "../includes/UserContext";

export default function Explore() {
  const [users, setUsers] = useState([]);
  const { userInfo } = useContext(UserContext);
  const [following, setFollowing] = useState([]);

  const fetchAllUsers = async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers);
  };

  async function fetchFollowing() {
    const following = await getUsersFollowing(userInfo.user_id);
    if (following) {
      setFollowing(following);
    }
  }

  useEffect(() => {
    fetchAllUsers();
    fetchFollowing();
  }, []);

  //FOLLOW USER BASED ON ID
  const follow = (user_id) => () => {
    const fields = {
      following_id: user_id,
      user_id: userInfo.user_id,
      timestamp: new Date(),
    };
    followUser(fields);
    setFollowing([...following, fields]);
  };

  //UNFOLLOW USER BASED ON ID
  const unfollow = (user_id) => () => {
    const fields = {
      following_id: user_id,
      user_id: userInfo.user_id
    };
    unfollowUser(fields);
    const newFollowing = following.filter(fid => fid.following_id !== user_id);
    setFollowing(newFollowing);
  };

  //IF USER SHOWN ON SCREEN MATCHES WHAT THE CURRENT LOGGED IN USER HAS FOLLOWED
  //SET BUTTON TO FOLLOWING WITH ONCLICK TO UNFOLLOW
  const renderFollowUnfollowBtns = (user_id) => {
    if (following.some((followingUser) => followingUser.following_id === user_id)) {
      return (
        <button
          type="button"
          className="btn btn-outline-primary mb-0 my-auto ml-auto"
          onClick={unfollow(user_id)}
        >
          Following
        </button>
      );
    } else {
      return(
        <button
          type="button"
          className="btn btn-primary mb-0 my-auto ml-auto"
          onClick={follow(user_id)}
        >
          Follow
        </button>
      );
    }
  }
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
                      src={
                        user.profile_pic_url
                          ? user.profile_pic_url
                          : default_profile_pic
                      }
                      alt="user"
                      className="w-100 profile-pic"
                    ></img>
                  </div>
                  <p className="mb-0 my-auto">
                    {user.firstname} {user.lastname}
                  </p>

                  {following.length === 0 ? (
                    <button
                      type="button"
                      className="btn btn-primary mb-0 my-auto ml-auto"
                      onClick={follow(user.user_id)}
                    >
                      Follow
                    </button>
                  ) : (
                    renderFollowUnfollowBtns(user.user_id)
                  )}
                      
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
