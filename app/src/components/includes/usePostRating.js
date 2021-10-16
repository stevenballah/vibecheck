import { useState, useContext, useEffect } from "react";
import {
  addLikeToDB,
  removeLikeFromDB,
  addDislikeToDB,
  removeDislikeFromDB,
  getUserLikes
} from "./repository";
import UserContext from "./UserContext";

const usePostRating = () => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [isRate, setIsRate] = useState(false);
  const [userLikes, setUserLikes] = useState([]);

  const { userInfo } = useContext(UserContext);

  const [fields, setFields] = useState({
    user_id: userInfo.user_id,
    post_id: "",
    timestamp: new Date(),
  });

  const addLike = (post_id, user_id) => () => {
    addLikeToDB(post_id, user_id);
    console.log("added LIKE to db");
  };

  const removeLike = (post_id, user_id) => () => {
    removeLikeFromDB(post_id, user_id);
    console.log("removed LIKE db");
  };

  const fetchLikes = async (user_id) => {
    const likes = await getUserLikes(user_id);
    setUserLikes(likes);
    console.log(likes);
  };

  const addDislike = (post_id) => (e) => {
    setDislike((prevState) => !prevState);
    setIsRate(true);
    setFields({
      user_id: userInfo.user_id,
      post_id: post_id,
      timestamp: new Date(),
    });
  };

  const removeDislike = (post_id) => (e) => {
    setIsRate(true);
    setFields({
      user_id: userInfo.user_id,
      post_id: post_id,
      timestamp: new Date(),
    });
  };

  return {
    addLike,
    addDislike,
    removeLike,
    removeDislike,
    fetchLikes,
    userLikes,
    isRate
  };
};

export default usePostRating;
