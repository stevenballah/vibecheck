import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <div className="form-group">
      <div className="sidenav">
          <div className="text-center my-3 text-light">
              Admin Portal
          </div>
        <nav className="nav nav-pills flex-column">
          <NavLink
            to="/Dashboard"
            className="flex-sm-fill nav-link mx-1 mb-2 bg-primary text-light rounded"
            activeClassName="active"
          >
            <i className="fas fa-tachometer-alt mr-2"></i>
            Dashboard
          </NavLink>
          <NavLink
            to="/Charts"
            className="flex-sm-fill nav-link mx-1 mb-2 bg-primary text-light rounded"
            activeClassName="active"
          >
            <i className="fas fa-chart-line mr-2"></i>
            Charts
          </NavLink>
          <NavLink
            to="/Tables"
            className="flex-sm-fill nav-link mx-1 mb-2 bg-primary text-light rounded"
            activeClassName="active"
          >
            <i className="fas fa-columns mr-2"></i>
            Tables
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
