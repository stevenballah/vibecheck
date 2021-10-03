import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import {
  isEmailRegistered,
  removeUser,
  updateName,
  updateEmail,
  changePassword,
} from "./repository";
import UserContext from "./UserContext";

const SettingsModal = (user) => {
  let history = useHistory();
  const { logoutUser, userInfo } = useContext(UserContext);
  const [errors, setErrors] = useState("");
  const [modal, setModal] = useState("");
  const [isSuccess, setSuccess] = useState(false);

  const [field, setField] = useState({
    email: "",
    firstname: "",
    lastname: "",
    oldpassword: "",
    password: "",
    password2: "",
    image: "",
  });

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setField({
      ...field,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (modal === "deleteAccModal") {
      if (!field.email.trim()) {
        setErrors("Please enter the email!");
      } else if (field.email !== user) {
        setErrors("Email does not match");
      } else if (field.email && field.email === user) {
        //DELETE THE ACCOUNT
        removeUser(user);
        logoutUser();
        history.push("/login");
        window.location.reload();
      }
    }

    if (modal === "editNameModal") {
      if (!field.firstname.trim() || !field.lastname.trim()) {
        setErrors("Please enter the name!");
      } else if (field.firstname && field.lastname) {
        //CHANGE NAME
        updateName(user, field.firstname, field.lastname);
        setSuccess(true);
      }
    }

    if (modal === "editEmailModal") {
      if (!field.email.trim()) {
        setErrors("Please enter the email!");
      } else if (isEmailRegistered(field.email)) {
        setErrors("This email is taken!");
      } else {
        //CHANGE EMAIL
        updateEmail(user, field.email);
        history.push("/login");
        window.location.reload();
      }
    }

    if (modal === "changePassModal") {
      if (
        !field.password.trim() ||
        !field.password2.trim() ||
        !field.oldpassword.trim()
      ) {
        setErrors("Passwords are required");
      } else if (field.oldpassword !== userInfo.password) {
        setErrors("Old password does not match");
      } else if (field.password2 !== field.password) {
        setErrors("New passwords do not match!");
      } else if (field.password.length < 6) {
        setErrors("New password must be atleast 6 characters or more");
      } else {
        //CHANGE PASSWORD
        changePassword(user, field.password);
        setSuccess(true);
      }
    }
  };

  //IF MODAL CHANGES, ERROR MESSAGE WILL RESET
  useEffect(() => {
    setField({
      email: "",
      firstname: "",
      lastname: "",
      oldpassword: "",
      password: "",
      password2: "",
      image: "",
    });
    setSuccess(false);
    setErrors("");
  }, [modal]);

  return { errors, onChangeHandle, handleSubmit, field, setModal, isSuccess, setField };
};

export default SettingsModal;
