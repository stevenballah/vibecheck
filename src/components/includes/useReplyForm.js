import { format } from "date-fns";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserContext from "./UserContext";

const useReplyForm = () => {
  const REPLY_KEY = "replies";
  const { currentUser } = useContext(UserContext);
  const { id } = useParams();

  const [replies, setReplies] = useState([]);

  function getDateTime() {
    //GETS THE DATE & TIME
    const datetime = format(new Date(), "MMMM d, yyyy - p");
    return datetime;
  }

  const [fields, setFields] = useState({
    message: "",
    author: currentUser,
    replyto: id,
  });

  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //PREVENTS FORM FROM RELOADING WHEN SUBMIT IS PRESSED
    if (!fields.message.trim()) {
      setErrors("Please ensure fields are not empty!");
    } else {
      //CREATE THE POST
      createReply(fields);
      
      //RESETS FIELDS BACK TO INITIAL STATE
      setFields({
        message: "",
        author: currentUser,
        replyto: id,
      });
    }
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
      datetime: getDateTime(),
    });
  };

  function createReply(fields) {
    const newReply = [fields, ...replies];
    setReplies(newReply);
    setReplyInStorage(newReply);
  }

  function setReplyInStorage(reply) {
    localStorage.setItem(REPLY_KEY, JSON.stringify(reply));
  }

  function getRepliesFromStorage() {
    initReplies();
    return JSON.parse(localStorage.getItem(REPLY_KEY));
  }

  function initReplies() {
    if (localStorage.getItem(REPLY_KEY) !== null) return;
    setReplies([]);
  }

  useEffect(() => {
    const repliesFromStorage = getRepliesFromStorage();
    if (repliesFromStorage) {
      setReplies(repliesFromStorage);
    }
  }, []);

  return { onChangeHandle, handleSubmit, errors, fields, replies };
};

export default useReplyForm;
