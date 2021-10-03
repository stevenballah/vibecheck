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

        //TOGGLE LOADING
        setLoading(true);

        if (verify) {
          console.log("Logged In | User exists in DB");
          setUserLoggedIn(true);

          //REMOVE ERROR
          setErrors({ ...errors, login: "" });

          loginUser(fields.email);

          //SET A .5s DELAY BEFORE REDIRECTING
          setTimeout(() => {
            history.push("/profile");
          }, 500);
        } else {
          //SET ERROR IF EMAIL & PASS DO NO MATCH THE DB (not verified)
          setErrors({ ...errors, login: "Email and password are incorrect!" });
        }
        //DISABLE LOADING
        setLoading(false);
      };
      getUser();
    }
    setSubmitted(false);
  }, [errors, isSubmitted, fields, history, loginUser]);

  return {
    fields,
    handleSubmit,
    onChangeHandle,
    errors,
    isUserLoggedIn,
    isLoading,
  };
};

export default useLoginForm;
