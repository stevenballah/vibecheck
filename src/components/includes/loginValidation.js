export default function loginValidation(fields) {
  let errors = {};

  if (!fields.email.trim()) {
    errors.email = "*Email address is required";
  }

  if (!fields.password.trim()) {
    errors.password = "*Password is required";
  }

  return errors;
}
