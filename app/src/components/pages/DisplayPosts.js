import React, { useContext, useEffect } from "react";
import usePostForm from "../includes/usePostForm";
import UserContext from "../includes/UserContext";
import user from "../images/user.png";
import { Link } from "react-router-dom";
import dateformat from "dateformat";
import usePostRating from "../includes/usePostRating";

export default function DisplayPosts() {
  const { posts, handleDeleteClick, fetchPost } = usePostForm();
  const { addLike, removeLike, addDislike, removeDislike, fetchLikes, userLikes } =
    usePostRating();
  const { userInfo } = useContext(UserContext);

  //RUN ONCE TO FETCH ALL
  useEffect(() => {
    fetchPost();
    fetchLikes(userInfo.user_id);
  }, []);


  const renderPostLikes = (user_likes, post_id, post_likes) => {
    //IF THE USER LIKES THE POST
    if (user_likes.some((post) => post.post_id === post_id)) {
      return (
        <button
          className="btn btn-light mr-2"
          onClick={removeLike(post_id, userInfo.user_id)}
        >
          <div className="text-primary">
            <i className="fas fa-thumbs-up"></i>
            <div className="badge badge-pill badge-primary ml-1">
              {post_likes.length}
            </div>
          </div>
        </button>
      );
    } else {
      return (
        <button className="btn btn-light mr-2" onClick={addLike(post_id, userInfo.user_id)}>
          <div className="text-dark">
            <i className="fas fa-thumbs-up"></i>
            <div className="badge badge-pill badge-dark ml-1">
              {post_likes.length}
            </div>
          </div>
        </button>
      );
    }
  };

  const renderPostDislikes = (dislikes, post_id) => {
    //IF THE USER LIKES THE POST
    if (dislikes.some((user) => user.user_id === userInfo.user_id)) {
      return (
        <button
          className="btn btn-light mr-2"
          onClick={removeDislike(post_id)}
        >
          <div className="text-primary">
            <i className="fas fa-thumbs-down"></i>
            <div className="badge badge-pill badge-primary ml-1">
              {dislikes.length}
            </div>
          </div>
        </button>
      );
    } else {
      return (
        <button className="btn btn-light mr-2" onClick={addDislike(post_id)}>
          <div className="text-dark">
            <i className="fas fa-thumbs-down"></i>
            <div className="badge badge-pill badge-dark ml-1">
              {dislikes.length}
            </div>
          </div>
        </button>
      );
    }
  };

  return (
    <div className="feed-body">
      {Object.keys(posts).length === 0 ? (
        <div className="bg-light p-3 rounded text-center text-danger">
          No Posts have been made
        </div>
      ) : (
        Object.keys(posts).map((x, index) => {
          const post = posts[x];

          return (
            <div
              className="feed-post bg-light rounded p-3 md-3 mb-3"
              key={index}
            >
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
                  <p className="mb-0 my-auto">
                    {post.user.firstname} {post.user.lastname}
                  </p>
                  <p className="mb-0 my-auto ml-auto">
                    {dateformat(post.timestamp, "mmmm dS, yyyy - h:MM TT")}
                  </p>
                </div>
                <hr></hr>
              </div>
              <div className="post-title">
                <h5 className="font-weight-bold">{post.title}</h5>
              </div>
              <div className="post-body">
                <p>{post.message}</p>
              </div>
              {post.image_url ? (
                <div className="post-image text-center mb-3">
                  <img
                    src={post.image_url}
                    className="rounded img-fluid shadow"
                    alt={post.image}
                  ></img>
                </div>
              ) : null}
              <div className="post-details">
                {/* IF SIGNED IN AND IS AUTHOR SHOW DELETE, EDIT AND REPLY */}
                {userInfo.user_id && post.user_id === userInfo.user_id ? (
                  <div className="row">
                    <div className="mr-auto ml-3">

                      {/* CHECK IF CURRENT USER LIKES THE POST */}
                      {renderPostLikes(userLikes, post.post_id, post.post_likes)}
                      {renderPostDislikes(post.post_dislikes, post.post_id)}

                      <div className="d-inline mr-2">
                        <i className="fas fa-comment"></i>
                        <div className="badge badge-pill badge-dark ml-1">
                          <Link
                            to={`/forum/posts/${post.post_id}`}
                            className="text-light"
                          >
                            {post.replies.length} replies
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="ml-auto mr-3">
                      <button
                        className="btn btn-danger mr-2"
                        onClick={handleDeleteClick(post.post_id, index)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                      <Link to={`/forum/edit-post/${post.post_id}`}>
                        <button className="btn btn-primary mr-2">
                          <i className="fas fa-pen"></i>
                        </button>
                      </Link>
                      <Link to={`/forum/posts/${post.post_id}`}>
                        <button className="btn btn-primary">
                          <p className="mb-0">
                            <i className="fas fa-reply mr-2"></i>Reply
                          </p>
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : null}

                {/* IF SIGNED IN BUT NOT THE AUTHOR SHOW REPLY */}
                {userInfo.user_id && post.user_id !== userInfo.user_id ? (
                  <div className="row">
                    <div className="mr-auto ml-3">
                      {/* CHECK IF CURRENT USER LIKES THE POST */}
                      {renderPostLikes(userLikes, post.post_id, post.post_likes)}
                      {renderPostDislikes(post.post_dislikes, post.post_id)}

                      <div className="d-inline mr-2">
                        <i className="fas fa-comment"></i>
                        <div className="badge badge-pill badge-dark ml-1">
                          <Link
                            to={`/forum/posts/${post.post_id}`}
                            className="text-light"
                          >
                            {post.replies.length} replies
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="ml-auto mr-3">
                      <Link to={`/forum/posts/${post.post_id}`}>
                        <button className="btn btn-primary">
                          <p className="mb-0">
                            <i className="fas fa-reply mr-2"></i>Reply
                          </p>
                        </button>
                      </Link>
                    </div>
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
