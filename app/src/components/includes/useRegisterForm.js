import { useState, useEffect } from "react";
import { getAllUsers, createNewUser } from "./repository";
import { format } from "date-fns";

const useRegisterForm = (validate) => {
  const [fields, setFields] = useState(
    {
      user_id: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      account_created: "",
      followers: 0
    }
  );
  const [errors, setErrors] = useState({});
  const [isSubmitted, setSubmitted] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  //CREATE THE NEW USER
  function registerUser(fields) {
    const users = getAllUsers();
    users[fields.email] = fields;
    setAccountCreated(true);
    createNewUser();
  }

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
      date: format(new Date(), "dd/MM/yyyy - p"),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //PREVENTS FORM FROM RELOADING WHEN SUBMIT IS PRESSED
    setErrors(validate(fields));
    setSubmitted(true);
    getAllUsers();
  };

  useEffect(() => {
    //IF THERE ARE NO ERRORS & FORM IS SUBMITTED
    if (Object.keys(errors).length === 0 && isSubmitted) {

      //CREATE THE USER USING FIELDS
      registerUser(fields);

      //RESETS THE TEXT FIELDS AFTER REGISTRATION
      setFields({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password2: ""
      });
      setSubmitted(false);
    }
  }, [isSubmitted, errors, fields]);

  return { onChangeHandle, fields, handleSubmit, errors, accountCreated };
};

export default useRegisterForm;
