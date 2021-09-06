import React, { useContext } from "react";
import { getUserInfo } from "../includes/repository";
import usePostForm from "../includes/usePostForm";
import UserContext from "../includes/UserContext";
import user from "../images/user.png";
import { Link } from "react-router-dom";

export default function DisplayPosts() {
  const { entries, handleDeleteClick } = usePostForm();
  const { currentUser } = useContext(UserContext);

  return (
    <div className="feed-body">
      {Object.keys(entries).length === 0 ? (
        <div className="bg-light p-3 rounded text-center text-danger">
          No Posts have been made
        </div>
      ) : (
        Object.keys(entries).map((x, index) => {
          const post = entries[x];
          const userInfo = getUserInfo(post.author);

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
                <h5 className="font-weight-bold">{post.title}</h5>
              </div>
              <div className="post-body">
                <p>{post.message}</p>
              </div>
              {post.image ? (
                <div className="post-image text-center mb-3">
                  <img src={post.image} className="rounded img-fluid shadow" alt={post.image}></img>
                </div>
              ) : null}
              <div className="row px-3 post-details">
                {/* IF SIGNED IN AND IS AUTHOR SHOW DELETE, EDIT AND REPLY */}
                {currentUser && post.author === currentUser ? (
                  <div className="ml-auto">
                    <button className="btn btn-danger mr-2" onClick={handleDeleteClick(index)}>
                      <i
                        className="fas fa-trash-alt"
                      ></i>
                    </button>
                    <Link to={`/forum/edit-post/${post.postId}`}>
                      <button className="btn btn-primary mr-2">
                        <i className="fas fa-pen"></i>
                      </button>
                    </Link>
                    <Link to={`/forum/posts/${post.postId}`}>
                      <button className="btn btn-primary">
                        <p className="mb-0">
                          <i className="fas fa-reply mr-2"></i>Reply
                        </p>
                      </button>
                    </Link>
                  </div>
                ) : null}

                {/* IF SIGNED IN BUT NOT THE AUTHOR SHOW REPLY */}
                {currentUser && post.author !== currentUser ? (
                  <div className="ml-auto">
                    <Link to={`/forum/posts/${post.postId}`}>
                      <button className="btn btn-primary">
                        <p className="mb-0">
                          <i className="fas fa-reply mr-2"></i>Reply
                        </p>
                      </button>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
