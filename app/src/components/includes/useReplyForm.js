import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { createNewReply, getPost } from "./repository";
import UserContext from "./UserContext";

const useReplyForm = () => {
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [post, setPost] = useState({});

  const [fields, setFields] = useState({
    reply_id: "",
    post_id: id,
    user_id: userInfo.user_id,
    message: "",
    timestamp: ""
  });
  
  const fetchPost = async () => {
    //GET THE POST BASED ON ID FROM DB
    const fetchedPost = await getPost(id);
    if (fetchedPost) {
      setPost(fetchedPost);
    }
  }

  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); //PREVENTS FORM FROM RELOADING WHEN SUBMIT IS PRESSED
    if (!fields.message.trim()) {
      setErrors("Please ensure fields are not empty!");
    } else {
      //CREATE A REPLY
      await createNewReply(fields);

      //FETCH ALL POSTS AGAIN AFTER TO SHOW THE RESULT TO USER
      fetchPost();

      //RESETS FIELDS BACK TO INITIAL STATE
      setFields({
        reply_id: "",
        post_id: id,
        user_id: userInfo.user_id,
        message: "",
        timestamp: ""
      });
    }
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value
    });
  };

  return { onChangeHandle, handleSubmit, errors, fields, fetchPost, post };
};

export default useReplyForm;
