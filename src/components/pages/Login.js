import React from "react";
import { Link } from "react-router-dom";
import useLoginForm from "../includes/useLoginForm";
import validate from "../includes/loginValidation";

export default function Login() {
  const { fields, handleSubmit, onChangeHandle, errors, isUserLoggedIn } =
    useLoginForm(validate);

  return (
    <div className="container d-flex flex-column min-vh-100">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Log in
              </h5>
              <div className="text-center">
                {errors.login && (
                  <p className="alert alert-danger">{errors.login}</p>
                )}
                {isUserLoggedIn ? (
                  <p className="alert alert-success">Login Success</p>
                ) : null}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <label htmlFor="floatingInput">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={fields.email}
                    onChange={onChangeHandle}
                  ></input>
                  {errors.email && (
                    <p className="text-danger">{errors.email}</p>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <label htmlFor="floatingInput">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={fields.password}
                    onChange={onChangeHandle}
                  ></input>
                  {errors.password && (
                    <p className="text-danger">{errors.password}</p>
                  )}
                </div>
                <div className="form-group mb-3">
                  <span className="text-danger"></span>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase w-100"
                    type="submit"
                  >
                    Log in
                  </button>
                </div>
                <div className="form-group text-center mt-4">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/register"> Create account</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
