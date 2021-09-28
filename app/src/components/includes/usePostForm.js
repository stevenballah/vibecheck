import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import UserContext from "./UserContext";
import { format } from "date-fns";

const usePostForm = () => {
  let history = useHistory();
  const { currentUser } = useContext(UserContext);

  const POSTS_KEY = "posts";

  const [entries, setEntries] = useState([]);
  const [errors, setErrors] = useState("");

  const [fields, setFields] = useState({
    postId: generateId(),
    author: currentUser,
    title: "",
    message: "",
    datetime: getDateTime(),
    image: "",
  });

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  //CALLING A IMGBB FREE IMAGE HOST API
  const uploadImage = async (e) => {
    const files = e.target.files;
    if (files[0]) {
      const data = new FormData();
      data.append("image", files[0]);
      setLoading(true);
      const result = await fetch(
        "https://api.imgbb.com/1/upload?expiration=600&key=8c11e1e917942fedbd38a483f7721267",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await result.json();
      const url = file.data.url;
      setImage(url);
      setLoading(false);

      //SETS THE IMAGE URL TO THE FIELDS
      setFields({
        ...fields,
        image: url,
      });
    } else {
      return;
    }
  };

  //GETS THE DATE & TIME
  function getDateTime() {
    const datetime = format(new Date(), "MMMM d, yyyy - p");
    return datetime;
  }

  //GENERATES A 16 BIT ID TO USE FOR THE POST
  function generateId() {
    var length = 16;
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let str = "";
    for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  }

  function initPosts() {
    if (localStorage.getItem(POSTS_KEY) !== null) return;
    setEntries([]);
  }

  function getPostsFromStorage() {
    initPosts();
    return JSON.parse(localStorage.getItem(POSTS_KEY));
  }

  function setPostsToStorage(posts) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }

  //EFFECT GETS CALLED EVERYTIME THE ARRAY CHANGES WHICH SETS THE STORAGE POSTS IN THE USE STATE
  //PREVENTS REMOVING THE POSTS FROM STORAGE WHEN NEW POST IS MADE AFTER REFRESH
  useEffect(() => {
    const postsFromStorage = getPostsFromStorage();
    if (postsFromStorage) {
      setEntries(postsFromStorage);
    }
  }, []);

  function createPost(fields) {
    const newPost = [fields, ...entries];
    setEntries(newPost);
    setPostsToStorage(newPost);
  }

  //USES THE INDEX PARAMETER TO DETERMINE THE POST TO DELETE
  const removePost = (index) => {
    const newPosts = [...entries.slice(0, index), ...entries.slice(index + 1)];
    setEntries(newPosts);
    setPostsToStorage(newPosts);
  };

  const handleDeleteClick = (index) => (e) => {
    removePost(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //PREVENTS FORM FROM RELOADING WHEN SUBMIT IS PRESSED
    if (!currentUser) {
      setErrors("Only logged in users can make a post!");
    } else if (!fields.title.trim() || !fields.message.trim()) {
      setErrors("Please ensure fields are not empty!");
    } else {
      //CREATE THE POST
      createPost(fields);
      history.push("/forum/posts");
    }
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  return {
    handleSubmit,
    onChangeHandle,
    fields,
    errors,
    entries,
    handleDeleteClick,
    getDateTime,
    getPostsFromStorage,
    image,
    loading,
    uploadImage,
    setImage,
  };
};

export default usePostForm;
