const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  console.log("data.email=" + data.email);

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name =
      "name must be atleast 2 character and less than 30 characters!";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name cannot be empty";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email cannot be empty";
  }

  if (
    !Validator.isEmail(data.email) ||
    data.email.indexOf("@mnit.ac.in") === -1
  ) {
    errors.email = "Email is Invalid or Use your MNIT Email ID";
  }

  /*if (data.email.indexOf("@mnit.ac.in") === -1) {
    errors.email = "Please use your MNIT Email ID";
  }*/

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password cannot be empty";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password is Required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password do not match !";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
