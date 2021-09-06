import React from "react";
import banner from "../images/worldtogether.svg";
import social from "../images/social-media.png";
import create from "../images/create.png";
import university from "../images/university.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light shadow-sm rounded">
        <div className="banner-body col-md-5 p-lg-5 mx-auto my-5">
          <div className="d-none d-lg-block">
            <img className="banner-svg" src={banner} alt="VIBECHECK"></img>
          </div>
          <h1 className="display-4 font-weight-normal">
            Together we are better.
          </h1>
          <p className="lead font-weight-normal">
            Vibe, explore and connect with students and teachers over the web.
          </p>
          <Link to="/register" className="btn btn-outline-primary">
            Get Started
          </Link>
        </div>
        <div className="wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#a2d9ff"
              fillOpacity="1"
              d="M0,192L48,176C96,160,192,128,288,117.3C384,107,480,117,576,149.3C672,181,768,235,864,213.3C960,192,1056,96,1152,74.7C1248,53,1344,107,1392,133.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="m-md-3 p-3 p-md-5 rounded text-center">
        <div className="row">
          <div className="col-xs-12 col-sm-4 my-4">
            <div className="card">
              <div className="card-body p-md-5">
                <img
                  className="card-img mx-auto"
                  src={social}
                  alt="social"
                ></img>
                <h5 className="font-weight-bold">Social platform</h5>
                <p className="card-text">
                  Connect with students and teachers across Australia.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-4 my-4">
            <div className="card">
              <div className="card-body p-md-5">
                <img
                  className="card-img mx-auto"
                  src={create}
                  alt="create"
                ></img>
                <h5 className="font-weight-bold">Create posts</h5>
                <p className="card-text">
                  Share your ideas with people who understand.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-4 my-4">
            <div className="card">
              <div className="card-body p-md-5">
                <img
                  className="card-img mx-auto"
                  src={university}
                  alt="university"
                ></img>
                <h5 className="font-weight-bold">
                  Supported by over +50 Universities
                </h5>
                <p className="card-text">
                  VibeCheck is used by many universities across Australia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
