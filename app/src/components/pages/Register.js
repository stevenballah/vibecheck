//import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import useRegisterForm from "../includes/useRegisterForm";
import validate from "../includes/registerValidation";

export default function Register() {
  const { onChangeHandle, fields, handleSubmit, errors, accountCreated } =
    useRegisterForm(validate);

  return (
    <div className="container">
      <div className="row mb-2">
        <div className="col-sm-12 col-md-10 col-lg-7 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Create an account
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="text-center">
                  {accountCreated === true ? (
                    <p className="alert alert-success">
                      Account has been successfully created!
                    </p>
                  ) : null}
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6 mb-3">
                    <div className="form-floating">
                      <label htmlFor="fname">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        value={fields.firstname}
                        onChange={onChangeHandle}
                      ></input>
                      {errors.firstname && (
                        <p className="text-danger">{errors.firstname}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 mb-3">
                    <div className="form-floating">
                      <label htmlFor="lname">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastname"
                        value={fields.lastname}
                        onChange={onChangeHandle}
                      ></input>
                      {errors.lastname && (
                        <p className="text-danger">{errors.lastname}</p>
                      )}
                    </div>
                  </div>
                </div>
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
                <div className="form-floating mb-3">
                  <label htmlFor="floatingInput">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password2"
                    value={fields.password2}
                    onChange={onChangeHandle}
                  ></input>
                  {errors.password2 && (
                    <p className="text-danger">{errors.password2}</p>
                  )}
                </div>
                <small id="passwordHelpBlock" className="form-text text-muted">
                  Your password must be at least 6 characters long, contain
                  upper and lower case letters, numbers, and special characters.
                </small>

                <div className="d-grid mt-3">
                  <button
                    className="btn btn-primary btn-login text-uppercase w-100"
                    type="submit"
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
                <div className="form-group mt-4 text-center">
                  <p>
                    Already have an account? <Link to="/login"> Sign in</Link>
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
