import React, { useContext, useState } from "react";
import UserContext from "../includes/UserContext";
import SettingsModal from "../includes/SettingsModal";

export default function Settings() {
  const { currentUser, userInfo } = useContext(UserContext);

  const {
    errors,
    onChangeHandle,
    handleSubmit,
    field,
    setModal,
    isSuccess,
    setField,
  } = SettingsModal(currentUser);

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  //CALLING A IMGBB FREE IMAGE HOST API
  const uploadImage = async (e) => {
    const files = e.target.files;
    if (files[0]) {
      const data = new FormData();
      data.append("image", files[0]);
      setLoading(true);
      const result = await fetch(
        "https://api.imgbb.com/1/upload?expiration=600&key=8c11e1e917942fedbd38a483f7721267",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await result.json();
      const url = file.data.url;
      setImage(url);
      setLoading(false);

      //SETS THE IMAGE URL TO THE FIELDS
      setField({
        ...field,
        image: url,
      });
    } else {
      return;
    }
  };

  return (
    <div className="row d-flex flex-column p-3 p-md-5 m-md-3">
      <div className="container bg-light rounded mb-4">
        <h2 className="pl-4 pt-2 mt-2">Account Settings</h2>
        <hr className="mx-4"></hr>
        <div className="container">
          <div className="col-sm-12 col-md-7 col-lg-8">
            <h6 className="font-weight-bold text-primary">ACCOUNT DETAILS</h6>
            <hr></hr>
            <div className="row">
              <div className="col my-auto">
                <p className="mb-0 font-weight-bold">Full name</p>
                <p className="mb-0">
                  {userInfo.firstname} {userInfo.lastname}
                </p>
              </div>
              <div className="col my-auto text-right">
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#editNameModal"
                  onClick={() => setModal("editNameModal")}
                >
                  <i className="fas fa-pen"></i>
                </button>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col my-auto">
                <p className="mb-0 font-weight-bold">Email address</p>
                <p className="mb-0">{userInfo.email}</p>
              </div>
              <div className="col my-auto text-right">
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#editEmailModal"
                  onClick={() => setModal("editEmailModal")}
                >
                  <i className="fas fa-pen"></i>
                </button>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col my-auto">
                <p className="mb-0 font-weight-bold">Password</p>
                <p className="mb-0">**************</p>
              </div>
              <div className="col my-auto text-right">
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#changePassModal"
                  onClick={() => setModal("changePassModal")}
                >
                  <i className="fas fa-pen"></i>
                </button>
              </div>
            </div>
            <hr></hr>
            <h6 className="font-weight-bold text-primary">PROFILE PICTURE</h6>
            <hr></hr>
            <div className="row">
              <div className="col my-auto">
                <p className="mb-0 font-weight-bold">Current profile image</p>
                {loading ? (
                  <p>Image uploading...</p>
                ) : (
                  <div className="image-preview text-center my-3">
                    <img
                      src={image}
                      className="rounded img-fluid"
                      alt={image}
                    ></img>
                  </div>
                )}
              </div>
              <div className="col my-auto text-right">
                <input
                  type="file"
                  id="input-file"
                  name="input-file"
                  accept="image/*"
                  hidden
                  onChange={uploadImage}
                />
                <label
                  className="btn-upload mb-0 btn btn-primary"
                  htmlFor="input-file"
                  role="button"
                >
                  <i className="fas fa-image mr-2"></i>Change Profile Image
                </label>
              </div>
            </div>
            <hr></hr>
            <h6 className="font-weight-bold text-primary">
              DEACTIVATE ACCOUNT
            </h6>
            <hr></hr>
            <div className="row mb-4">
              <div className="col my-auto">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#deleteAccModal"
                  onClick={() => setModal("deleteAccModal")}
                >
                  <i className="fas fa-trash-alt mr-2"></i>
                  DELETE ACCOUNT
                </button>
              </div>
            </div>

            <form
              className="modal fade"
              id="deleteAccModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="deleteAccModal"
              aria-hidden="true"
              onSubmit={handleSubmit}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Delete Account
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Please enter your email address to confirm deletion.</p>
                    <input
                      type="text"
                      className="form-control text-danger"
                      name="email"
                      onChange={onChangeHandle}
                      value={field.email}
                    ></input>
                    <p className="text-danger">{errors}</p>
                    <span className="text-success">
                      {isSuccess ? (
                        <div className="d-flex">
                          <i className="fas fa-check-circle my-auto mr-2"></i>
                          <p className="mb-0 my-auto">Successfully changed!</p>
                        </div>
                      ) : null}
                    </span>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-danger">
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <form
              className="modal fade"
              id="editNameModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="editNameModal"
              aria-hidden="true"
              onSubmit={handleSubmit}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Change account name
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col">
                        <p className="mb-0">First Name</p>
                        <input
                          type="text"
                          className="form-control"
                          name="firstname"
                          onChange={onChangeHandle}
                          value={field.firstname}
                        ></input>
                      </div>
                      <div className="col">
                        <p className="mb-0">Last Name</p>
                        <input
                          type="text"
                          className="form-control"
                          name="lastname"
                          onChange={onChangeHandle}
                          value={field.lastname}
                        ></input>
                      </div>
                    </div>
                    <p className="text-danger">{errors}</p>
                    <span className="text-success">
                      {isSuccess ? (
                        <div className="d-flex">
                          <i className="fas fa-check-circle my-auto mr-2"></i>
                          <p className="mb-0 my-auto">Successfully changed!</p>
                        </div>
                      ) : null}
                    </span>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <form
              className="modal fade"
              id="editEmailModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="editEmailModal"
              aria-hidden="true"
              onSubmit={handleSubmit}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Change email address
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p className="mb-0">New email address</p>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={onChangeHandle}
                      value={field.email}
                    ></input>
                    <p className="text-danger">{errors}</p>
                    <span className="text-success">
                      {isSuccess ? (
                        <div className="d-flex">
                          <i className="fas fa-check-circle my-auto mr-2"></i>
                          <p className="mb-0 my-auto">Successfully changed!</p>
                        </div>
                      ) : null}
                    </span>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <form
              className="modal fade"
              id="changePassModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="changePassModal"
              aria-hidden="true"
              onSubmit={handleSubmit}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Change password
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p className="mb-0">Old password</p>
                    <input
                      type="password"
                      className="form-control"
                      name="oldpassword"
                      onChange={onChangeHandle}
                      value={field.oldpassword}
                    ></input>
                    <p className="mb-0">New password</p>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={onChangeHandle}
                      value={field.password}
                    ></input>
                    <p className="mb-0">Re-type new password</p>
                    <input
                      type="password"
                      className="form-control"
                      name="password2"
                      onChange={onChangeHandle}
                      value={field.password2}
                    ></input>
                    <p className="text-danger">{errors}</p>
                    <span className="text-success">
                      {isSuccess ? (
                        <div className="d-flex">
                          <i className="fas fa-check-circle my-auto mr-2"></i>
                          <p className="mb-0 my-auto">Successfully changed!</p>
                        </div>
                      ) : null}
                    </span>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
