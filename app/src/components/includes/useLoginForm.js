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
  const [isLoading, setLoading] = useState(false);

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
    //IF THERE ARE NO ERRORS & SUBMITTED VERIFY USER USING ASYNC AWAIT FUNCTION
    if (Object.keys(errors).length === 0 && isSubmitted) {
      const getUser = async () => {
        const verify = await verifyUser(fields.email, fields.password);
        if (verify) {
          setLoading(true); //TOGGLE LOADING
          console.log("Logged In | User exists in DB");
          setUserLoggedIn(true);

          errors.login = "";

          loginUser(fields.email);
          setTimeout(() => {
            history.push("/profile");
          }, 500);
        }
      }
      getUser();
      setLoading(false);  //DISABLE LOADING
      errors.login = "Email and password are incorrect!";
    }
    setSubmitted(false);
  }, [errors, isSubmitted, fields, history, loginUser]);

  return { fields, handleSubmit, onChangeHandle, errors, isUserLoggedIn, isLoading };
};

export default useLoginForm;
