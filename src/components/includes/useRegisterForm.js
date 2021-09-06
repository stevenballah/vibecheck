import { useState, useEffect } from "react";
import { getUsers, setUsers } from "./repository";
import { format } from "date-fns";

const useRegisterForm = (validate) => {
  const [fields, setFields] = useState(
    {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
      date: "",
      image: "",
    },
    getUsers()
  );
  const [errors, setErrors] = useState({});
  const [isSubmitted, setSubmitted] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  function registerUser(fields) {
    const users = getUsers();
    users[fields.email] = fields;
    setUsers(users);
    setAccountCreated(true);
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
  };

  useEffect(() => {
    //IF THERE ARE NO ERRORS & FORM IS SUBMITTED
    if (Object.keys(errors).length === 0 && isSubmitted) {
      registerUser(fields);

      //RESETS THE TEXT FIELDS AFTER REGISTRATION
      setFields({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password2: "",
        image: "",
      });
      setSubmitted(false);
    }
  }, [isSubmitted, errors, fields]);

  return { onChangeHandle, fields, handleSubmit, errors, accountCreated };
};

export default useRegisterForm;
