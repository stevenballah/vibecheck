import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import { getPost, editPost } from "../includes/repository";
import user from "../images/user.png";
import dateformat from "dateformat";

function EditPost() {
  let history = useHistory();
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const [editFields, setEditFields] = useState({
    title: "",
    message: "",
  });

  const fetchPost = async () => {
    //GET THE POST BASED ON ID FROM DB
    const fetchedPost = await getPost(id);
    if (fetchedPost) {
      setPost(fetchedPost);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    //IF THE TITLE AND MESSAGE IS PRESENT SET THE VALUE
    if (post.length !== 0) {
      setEditFields({
        title: post.title,
        message: post.message,
      });
    }
  }, [post]);

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setEditFields({
      ...editFields,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //PREVENTS FORM FROM RELOADING WHEN SUBMIT IS PRESSED

    if (await editPost(editFields, post.post_id)) {
      history.push("/forum/posts");
    }
  };

  return (
    <div className="feed-edit">
      <Link to="/forum/posts" className="btn btn-light mb-3">
        <i className="fas fa-arrow-left mr-2"></i>
        Cancel
      </Link>
      {post.length === 0 ? (
        //LOADING
        <div className="loading-posts bg-light rounded p-3 text-center">
          <h5>Loading post</h5>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="feed-post bg-light rounded p-3 md-3 mb-3">
            <div className="post-author">
              <div className="row mx-1">
                <div className="col-sm-2 col-md-2 col-lg-1">
                  <img
                    src={
                      post.user.profile_pic_url
                        ? post.user.profile_pic_url
                        : user
                    }
                    alt="user"
                    className="w-100 profile-pic"
                  ></img>
                </div>
                <p className="mb-0 my-auto font">
                  {post.user.firstname} {post.user.lastname}
                </p>
                <p className="mb-0 my-auto ml-auto">
                  {dateformat(post.timestamp, "mmmm dS, yyyy - h:MM TT")}
                </p>
              </div>
              <hr></hr>
            </div>
            <div className="post-title">
              <input
                className="form-control mb-2"
                type="text"
                name="title"
                value={editFields.title}
                onChange={onChangeHandle}
              ></input>
            </div>
            <div className="post-body">
              <textarea
                className="form-control mb-3"
                type="text"
                rows="10"
                name="message"
                value={editFields.message}
                onChange={onChangeHandle}
              ></textarea>
            </div>
            {post.image ? (
              <div className="post-image text-center mb-3">
                <img
                  src={post.image}
                  className="rounded img-fluid shadow"
                  alt={post.image}
                ></img>
              </div>
            ) : null}

            <button type="submit" className="btn btn-primary form-control">
              SAVE
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditPost;
