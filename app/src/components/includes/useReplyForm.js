import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createNewReply, getReplies, getUserInfo } from "./repository";
import UserContext from "./UserContext";

const useReplyForm = () => {
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  const [replies, setReplies] = useState([]);

  const [fields, setFields] = useState({
    reply_id: "",
    post_id: id,
    user_id: userInfo.user_id,
    message: "",
    timestamp: ""
  });

  const [errors, setErrors] = useState("");
  
  async function getPostReplies() {
    const replies = await getReplies(id);
    setReplies(replies);
  }

  useEffect(() => {
    getPostReplies();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault(); //PREVENTS FORM FROM RELOADING WHEN SUBMIT IS PRESSED
    if (!fields.message.trim()) {
      setErrors("Please ensure fields are not empty!");
    } else {
      //CREATE THE POST
      createNewReply(fields);
      getUserInfo();
      
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

  return { onChangeHandle, handleSubmit, errors, fields, replies };
};

export default useReplyForm;
