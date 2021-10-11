import { useState, useEffect } from "react";
import { createNewUser, isEmailRegistered } from "./repository";

const useRegisterForm = (validate) => {
  const [fields, setFields] = useState(
    {
      user_id: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
      account_created: "",
      profile_pic_url: null
    }
  );
  const [errors, setErrors] = useState({});
  const [isSubmitted, setSubmitted] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value
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

      const checkEmail = async () => {
        const user = await isEmailRegistered(fields.email);
        
        if (user) {
          setErrors({...errors, email: "The email already exists"});
        } else {
          //RESETS THE TEXT FIELDS AFTER REGISTRATION
          setFields({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password2: ""
          });
          
          //TOGGLE ACCOUNT CREATED TO TRUE
          setAccountCreated(true);
          //CREATE THE USER USING FIELDS
          createNewUser(fields);
        }
      }
      checkEmail();
      
      setSubmitted(false);
    }
  }, [isSubmitted, errors, fields]);

  return { onChangeHandle, fields, handleSubmit, errors, accountCreated };
};

export default useRegisterForm;
