export default function validation(fields) {
  let errors = {};

  if (!fields.firstname.trim()) {
    errors.firstname = "*Firstname is required";
  }
  if (!fields.lastname.trim()) {
    errors.lastname = "*Lastname is required";
  }
  if (!fields.email.trim()) {
    errors.email = "*Email address is required";
  }

  if (!fields.password.trim()) {
    errors.password = "*Password is required";
  } else if (fields.password.length < 6) {
    errors.password = "*Password must be atleast 6 characters or more";
  } else if (
    !RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$").test(
      fields.password
    )
  ) {
    errors.password = "*Password does not meet requirement!";
  }

  if (!fields.password2.trim()) {
    errors.password2 = "*Password is required";
  } else if (fields.password2 !== fields.password) {
    errors.password2 = "*Passwords do not match!";
  }

  return errors;
}
