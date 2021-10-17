import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser, updateUser } from "../data/repository";
import dateformat from "dateformat";

export default function EditUser() {
  const [currentUser, setCurrentUser] = useState([]);
  const { user_id } = useParams();
  const [fields, setFields] = useState({
    user_id: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  //FORMAT THE DATE FROM DATABASE
  function formatDate(date) {
    const formatDate = dateformat(date, "mmmm dS, yyyy - h:MM TT");
    return formatDate;
  }

  useEffect(() => {
    async function loadUser() {
      const user = await getUser(user_id);
      setCurrentUser(user);
      setFields(user);
    }
    loadUser();
  }, [user_id]);

  // Generic change handler.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    const user = await updateUser(fields);
    setMessage(
      `${user.firstname} ${user.lastname}'s profile Successfully updated `
    );
  };

  return (
    <div className="container-fluid mt-4">
      <div className="jumbotron jumbotron-fluid rounded">
        <div className="container">
          <h1 className="display-4">Manage User</h1>
          <p className="lead">{currentUser.firstname} {currentUser.lastname}</p>
        </div>
      </div>

      <div className="bg-light rounded">
        <div className="row p-5">
          <div className="col-md-3 rounded bg-dark shadow-md text-light">
            <h4 className="text-center mt-2">Profile</h4>
            <div className="profile-pic text-center">
              <img
                src={currentUser.profile_pic_url}
                alt="user"
                className="w-50 shadow-md rounded"
              ></img>
            </div>
            <p className="font-weight-bold mb-0">User ID</p>
            <p>{currentUser.user_id}</p>
            <p className="font-weight-bold mb-0">Email</p>
            <p>{currentUser.email}</p>
            <p className="font-weight-bold mb-0">Full Name</p>
            <p>
              {currentUser.firstname} {currentUser.lastname}
            </p>
            <p className="font-weight-bold mb-0">Account created</p>
            <p>
              {formatDate(new Date().toISOString(currentUser.account_created))}
            </p>
          </div>
          <div className="col-md-6">
            <form onSubmit={submitHandle}>
              <h4 className="mb-4">Update User Details</h4>
              <div className="form-group">
                <label htmlFor="user_id" className="control-label">
                  User ID
                </label>
                <input
                  className="form-control mb-2"
                  type="text"
                  name="user_id"
                  id="user_id"
                  value={fields.user_id}
                  onChange={handleInputChange}
                  disabled
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="firstname" className="control-label">
                      First Name
                    </label>
                    <input
                      className="form-control mb-2"
                      type="text"
                      name="firstname"
                      id="firstname"
                      value={fields.firstname}
                      onChange={handleInputChange}
                    ></input>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="lastname" className="control-label">
                      Last Name
                    </label>
                    <input
                      className="form-control mb-2"
                      type="text"
                      name="lastname"
                      id="lastname"
                      value={fields.lastname}
                      onChange={handleInputChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="user_id" className="control-label">
                  Email
                </label>
                <input
                  className="form-control mb-2"
                  type="text"
                  name="email"
                  id="email"
                  value={fields.email}
                  onChange={handleInputChange}
                ></input>
              </div>
              {message ? (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              ) : null}
              <div className="form-group text-center mt-5">
                <Link className="btn btn-secondary mr-5" to="/Tables/users">
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
