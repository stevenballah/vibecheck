import { useState, useEffect, useContext } from "react";
import { verifyUser } from "./repository";
import { useHistory } from "react-router";
import UserContext from "./UserContext";

const useLoginForm = (validate) => {
  let history = useHistory();

  const { loginUser } = useContext(UserContext);

  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setSubmitted] = useState(false);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); //PREVENTS FORM FROM RELOADING WHEN SUBMIT IS PRESSED
    setErrors(validate(fields));
    setSubmitted(true);
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitted) {
      //IF THERE ARE NO ERRORS VERIFY USER
      const verified = verifyUser(fields.email, fields.password);
      if (verified === true) {
        console.log("LOG IN USER");
        setUserLoggedIn(true);

        //RESET THE FIELDS
        setFields({
          email: "",
          password: "",
        });

        //RESET ERROR MESSAGE
        errors.login = "";

        loginUser(fields.email);
        history.push("/profile");
        return;
      }
      errors.login = "Email and password are incorrect!";
    }
    setSubmitted(false);
  }, [errors, isSubmitted, fields, history, loginUser]);

  return { fields, handleSubmit, onChangeHandle, errors, isUserLoggedIn };
};

export default useLoginForm;
