import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import UserContext from "./UserContext";
import { createNewPost, getAllPosts, removePost } from "./repository"

const usePostForm = () => {
  let history = useHistory();
  const { currentUser, userInfo } = useContext(UserContext);


  const [errors, setErrors] = useState("");
  const [chars, setChars] = useState(600);
  const [titleChar, setTitleChar] = useState(0);
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    const posts = await getAllPosts();
    if (posts) {
      setPosts(posts);
    }
    console.log(posts);
  }

  const [fields, setFields] = useState({
    post_id: "",
    user_id: userInfo.user_id,
    title: "",
    message: "",
    image_url: null,
    timestamp: ""
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
      setFields({...fields, image_url: url});
    } else {
      return;
    }
  };

  const handleDeleteClick = (post_id, index) => (e) => {
    //REMOVES THE POST BASED ON THE INDEX IN THE USESTATE OF POSTS FETCHED FROM DB
    const newPosts = [...posts.slice(0, index), ...posts.slice(index + 1)];
    console.log(newPosts);
    setPosts(newPosts);
    removePost(post_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //PREVENTS FORM FROM RELOADING WHEN SUBMIT IS PRESSED
    if (!currentUser) {
      setErrors("Only logged in users can make a post!");
    } else if (!fields.title.trim() || !fields.message.trim()) {
      setErrors("Please ensure fields are not empty!");
    } else {
      //CREATE THE POST THEN REDIRECT TO ALL POSTS
      if (await createNewPost(fields)){
        history.push("/forum/posts");
      }
    }
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });

    if (name === "message") {
      //ON CHANGE HANDLE LIMIT CHARACTER
      var input = e.target.value;
      var max_chars = 600;
      setChars(max_chars - input.length);
    }
    if (name === "title") {
      //ON CHANGE HANDLE LIMIT CHARACTER
      var input = e.target.value;
      setTitleChar(input.length);
    }
  };

  return {
    handleSubmit,
    onChangeHandle,
    fields,
    errors,
    posts,
    handleDeleteClick,
    image,
    loading,
    uploadImage,
    setImage,
    chars,
    titleChar,
    fetchPost
  };
};

export default usePostForm;
