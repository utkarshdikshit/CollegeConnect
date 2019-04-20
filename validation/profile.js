const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.currenttitle = !isEmpty(data.currenttitle) ? data.currenttitle : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 4 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle is required";
  }

  if (Validator.isEmpty(data.currenttitle)) {
    errors.currenttitle = "Status is required";
  }

  if (Validator.isEmpty(data.interests)) {
    errors.interests = "Interests cannot be empty";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (isEmpty(data.mail)) {
    errors.mail = "Enter your Mail id";
  }
  if (isEmpty(data.pincode)) {
    errors.pincode = "Please enter your Pincode";
  }
  if (isEmpty(data.contact)) {
    errors.contact = "Please Enter your Contact Number";
  }

  if (!Validator.isEmail(data.mail)) {
    errors.mail = "Please enter a valid Email ID";
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  /* if (!Validator.isLength(data.contact, { min: 10, max: 10 })) {
    errors.contact = "Please enter a 10 digit contact number";
  }

  if (!Validator.isLength(data.pincode, { min: 6, max: 6 })) {
    errors.pincode = "Please enter a 6 digit pincode";
  }
*/
  /* if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  } */

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
