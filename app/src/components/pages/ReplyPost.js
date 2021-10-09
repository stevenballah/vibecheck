import React from "react";
import { Link, useParams } from "react-router-dom";
import usePostForm from "../includes/usePostForm";
import user from "../images/user.png";
import useReplyForm from "../includes/useReplyForm";
import dateformat from "dateformat";

function ReplyPost() {
  const { onChangeHandle, handleSubmit, errors, fields, replies } =
    useReplyForm();
  const { id } = useParams();
  const { entries } = usePostForm();

  return (
    <div className="feed-reply">
      <Link to="/forum/posts" className="btn btn-light mb-3">
        <i className="fas fa-arrow-left mr-2"></i>
        Back
      </Link>

      {entries.map((post, index) => {
        const currentPostId = post.post_id;

        if (id === currentPostId) {
          return (
            <div
              className="feed-post bg-light rounded p-3 md-3 mb-3"
              key={index}
            >
              <div className="post-author profile">
                <div className="row mx-1">
                  <div className="col-sm-2 col-md-2 col-lg-1">
                    <img src={post.user.profile_pic_url} alt="user" className="w-100 profile-pic"></img>
                  </div>
                  <p className="mb-0 my-auto font">
                    {post.user.firstname} {post.user.lastname} posted
                  </p>
                  <p className="mb-0 my-auto ml-auto">{dateformat(post.timestamp, "mmmm dS, yyyy - h:MM TT")}</p>
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
              
              <form onSubmit={handleSubmit}>
                <div className="container bg-light rounded p-3">
                  <textarea
                    className="form-control mb-3"
                    type="text"
                    placeholder="Write something here..."
                    name="message"
                    value={fields.message}
                    onChange={onChangeHandle}
                  ></textarea>
                  <p className="text-danger">{errors}</p>
                  <button
                    type="submit"
                    className="btn btn-primary form-control"
                  >
                    Reply
                  </button>
                </div>
              </form>
            </div>
          );
        } else {
          return null;
        }
      })}

      {replies.map((reply, index) => {
        const currentPostId = reply.replyto;

        if (id === currentPostId) {
          return (
            <div
              className="reply-group bg-light rounded p-3 md-3 mb-3"
              key={index}
            >
              <div className="reply-author">
                <div className="row mx-1">
                  <div className="col-sm-2 col-md-2 col-lg-1">
                    <img src={user} alt="user" className="w-100"></img>
                  </div>
                  <p className="mb-0 my-auto font">
                    {reply.user.firstname} {reply.user.lastname} replied
                  </p>
                  <p className="mb-0 my-auto ml-auto">{reply.datetime}</p>
                </div>
                <hr></hr>
              </div>
              <div className="reply-body">
                <p>{reply.message}</p>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default ReplyPost;
