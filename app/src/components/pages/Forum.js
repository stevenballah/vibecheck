import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";

export default function Forum() {

  return (
    <div className="form-group">
      <div className="bg-light rounded">
        <nav className="nav nav-pills flex-column flex-sm-row p-2">
          <NavLink
            to="/forum/explore"
            className="flex-sm-fill text-sm-center nav-link mx-1"
            activeClassName="active"
          >
            <i className="fas fa-users mr-2"></i>
            Explore
          </NavLink>
          <NavLink
            to="/forum/posts"
            className="flex-sm-fill text-sm-center nav-link mx-1"
            activeClassName="active"
          >
            <i className="fas fa-comments mr-2"></i>
            Posts
          </NavLink>
          <NavLink
            to="/forum/new-post"
            className="flex-sm-fill text-sm-center nav-link mx-1"
            activeClassName="active"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            New Post
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
