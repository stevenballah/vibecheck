import React from "react";

export default function Dashboard() {
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
            <p className="card-text display-3 font-weight-bold">10</p>
          </div>
          <div className="card-footer">
            <small className="card-text">More details...</small>
          </div>
        </div>

        <div className="card text-center">
          <i className="fa fa-users fa-5x card-img-top mt-4 text-primary"></i>
          <div className="card-body">
            <h5 className="card-title">Total users</h5>
            <p className="card-text display-3 font-weight-bold">10</p>
          </div>
          <div className="card-footer">
            <small className="card-text">More details...</small>
          </div>
        </div>

        <div className="card text-center">
          <i className="fa fa-reply-all fa-5x card-img-top mt-4 text-primary"></i>
          <div className="card-body">
            <h5 className="card-title">Total replies</h5>
            <p className="card-text display-3 font-weight-bold">10</p>
          </div>
          <div className="card-footer">
            <small className="card-text">More details...</small>
          </div>
        </div>
        
      </div>
    </div>
  );
}
