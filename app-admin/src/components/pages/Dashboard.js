import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsers, getPosts, getReplies } from "../data/repository";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    loadUsers();
    loadPosts();
    loadReplies();
  }, []);

  const loadUsers = async () => {
    const allUsers = await getUsers();
    setUsers(allUsers);
  };

  const loadPosts = async () => {
    const allPosts = await getPosts();
    setPosts(allPosts);
  };

  const loadReplies = async () => {
    const allReplies = await getReplies();
    setReplies(allReplies);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="jumbotron jumbotron-fluid rounded">
        <div className="container">
          <h1 className="display-4">Dashboard</h1>
          <p className="lead">
            A quick summary showing how VibeCheck is performing
          </p>
        </div>
      </div>

      <div className="card-deck">
        <div className="card text-center">
          <i className="fa fa-comments fa-5x card-img-top mt-4 text-primary"></i>
          <div className="card-body">
            <h5 className="card-title">Total posts</h5>
            <p className="card-text display-3 font-weight-bold">
              {posts.length}
            </p>
          </div>
          <div className="card-footer">
            <Link to="/Tables/posts">View more details...</Link>
          </div>
        </div>

        <div className="card text-center">
          <i className="fa fa-users fa-5x card-img-top mt-4 text-primary"></i>
          <div className="card-body">
            <h5 className="card-title">Total users</h5>
            <p className="card-text display-3 font-weight-bold">
              {users.length}
            </p>
          </div>
          <div className="card-footer">
            <Link to="/Tables/users">View more details...</Link>
          </div>
        </div>

        <div className="card text-center">
          <i className="fa fa-reply-all fa-5x card-img-top mt-4 text-primary"></i>
          <div className="card-body">
            <h5 className="card-title">Total replies</h5>
            <p className="card-text display-3 font-weight-bold">{replies.length}</p>
          </div>
          <div className="card-footer">
            <Link to="/Tables/replies">View more details...</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
