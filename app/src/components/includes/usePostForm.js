import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import UserContext from "./UserContext";
import { getAllPosts, createNewPost } from "./repository"

const usePostForm = () => {
  let history = useHistory();
  const { currentUser, userInfo } = useContext(UserContext);

  const [entries, setEntries] = useState([]);
  const [errors, setErrors] = useState("");

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
  
  //USE EFFECT GETS CALLED ONCE TO GET ALL POSTS FROM DB
  useEffect(() => {
    const getPosts = async () => {
      const posts = await getAllPosts();
      if (posts) {
        setEntries(posts);
      }
      console.log(posts);
    }
    getPosts();
  }, []);

  //USES THE INDEX PARAMETER TO DETERMINE THE POST TO DELETE
  const removePost = (index) => {
    // const newPosts = [...entries.slice(0, index), ...entries.slice(index + 1)];
    // setEntries(newPosts);
    // setPostsToStorage(newPosts);
  };

  const handleDeleteClick = (index) => (e) => {
    removePost(index);
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
  };

  return {
    handleSubmit,
    onChangeHandle,
    fields,
    errors,
    entries,
    handleDeleteClick,
    image,
    loading,
    uploadImage,
    setImage,
  };
};

export default usePostForm;
