import { useState, useContext, useEffect } from "react";
import {
  addLikeToDB,
  removeLikeFromDB,
  addDislikeToDB,
  removeDislikeFromDB,
  getUserLikes,
  getUserDislikes
} from "./repository";
import UserContext from "./UserContext";

const usePostRating = () => {
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [isRate, setIsRate] = useState(false);
  const { userInfo } = useContext(UserContext);

  //GET ALL USERS LIKES ON POSTS
  const fetchLikes = async (user_id) => {
    const likes = await getUserLikes(user_id);
    if (likes) {
      setLikes(likes);
    }
  };

  const addLike = (post_id, user_id) => () => {
    const fields = {
      post_id: post_id,
      user_id: user_id,
      timestamp: new Date(),
    };

    addLikeToDB(fields);
    setLikes([...likes, fields]);
  };

  const removeLike = (post_id, user_id) => () => {
    const fields = {
      post_id: post_id,
      user_id: user_id
    };

    removeLikeFromDB(fields);
    const unLike = likes.filter(pid => pid.post_id !== post_id);
    console.log(unLike);
    setLikes(unLike);
  };


  //GET ALL USERS DISLIKES ON POSTS
  const fetchDislikes = async (user_id) => {
    const dislikes = await getUserDislikes(user_id);
    if (dislikes) {
      setDislikes(dislikes);
    }
  };

  const addDislike = (post_id, user_id) => () => {
    const fields = {
      post_id: post_id,
      user_id: user_id,
      timestamp: new Date(),
    };

    addDislikeToDB(fields);
    setDislikes([...dislikes, fields]);
  };

  const removeDislike = (post_id, user_id) => () => {
    const fields = {
      post_id: post_id,
      user_id: user_id
    };

    removeDislikeFromDB(fields);
    const unDislike = dislikes.filter(pid => pid.post_id !== post_id);
    console.log(unDislike);
    setDislikes(unDislike);
  };

  return {
    addLike,
    addDislike,
    removeLike,
    removeDislike,
    likes,
    dislikes,
    fetchLikes,
    fetchDislikes
  };
};

export default usePostRating;
