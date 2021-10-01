import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserInfo } from "../includes/repository";
import usePostForm from "../includes/usePostForm";
import user from "../images/user.png";

function EditPost() {
  const { id } = useParams();
  const { entries } = usePostForm();
  const [editFields, setEditFields] = useState({
    title: "",
    message: "",
  });

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setEditFields({
      [name]: value,
    });
  };

  return (
    <div className="feed-reply">
      <Link to="/forum/posts" className="btn btn-light mb-3">
        <i className="fas fa-arrow-left mr-2"></i>
        Cancel
      </Link>

      {entries.map((post, index) => {
        const storagePostId = post.postId;
        const userInfo = getUserInfo(post.author);

        if (id === storagePostId) {
          return (
            <div
              className="feed-post bg-light rounded p-3 md-3 mb-3"
              key={index}
            >
              <div className="post-author">
                <div className="row mx-1">
                  <div className="col-sm-2 col-md-2 col-lg-1">
                    <img src={user} alt="user" className="w-100"></img>
                  </div>
                  <p className="mb-0 my-auto font">
                    {userInfo.firstname} {userInfo.lastname}
                  </p>
                  <p className="mb-0 my-auto ml-auto">{post.datetime}</p>
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
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default EditPost;
