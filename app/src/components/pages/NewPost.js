import React, { useContext } from "react";
import usePostForm from "../includes/usePostForm";
import UserContext from "../includes/UserContext";

export default function NewPost() {
  const { currentUser } = useContext(UserContext);

  const {
    handleSubmit,
    onChangeHandle,
    fields,
    errors,
    image,
    loading,
    uploadImage,
    chars,
    titleChar
  } = usePostForm(currentUser);
  return (
    <form onSubmit={handleSubmit}>
      <div className="container bg-light rounded p-3">
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Title"
            name="title"
            value={fields.title}
            maxLength="100"
            onChange={onChangeHandle}
          ></input>
          <div className="input-group-append">
            <span className="input-group-text">{titleChar}/100</span>
          </div>
        </div>
        <textarea
          className="form-control mb-3"
          type="text"
          rows="10"
          placeholder="Write something here..."
          name="message"
          value={fields.message}
          onChange={onChangeHandle}
          maxLength="600"
        ></textarea>
        <p className={chars < 100 ? "text-danger" : "text-secondary"}>{chars} characters remaining</p>

        <div className="upload">
          <input
            type="file"
            id="input-file"
            name="input-file"
            accept="image/*"
            hidden
            onChange={uploadImage}
          />
          <label
            className="btn-upload mb-0 btn btn-primary mr-3"
            htmlFor="input-file"
            role="button"
          >
            <i className="fas fa-image mr-2"></i>Upload Image
          </label>

          {loading ? (
            <p>Image uploading...</p>
          ) : (
            <div className="image-preview text-center my-3">
              <img src={image} className="rounded img-fluid" alt={image}></img>
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary form-control">
          POST
        </button>

        <p className="text-danger mb-0 mt-3 text-center">{errors}</p>
      </div>
    </form>
  );
}
