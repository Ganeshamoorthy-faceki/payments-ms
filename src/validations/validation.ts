import * as Yup from "yup";

export function userRegistrationSchema() {
  return Yup.object().shape({
    firstName: Yup.string().required().min(3,"FirstName has to be longer than 3 characters!"),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .min(8, "Password has to be longer than 8 characters!")
      .required(),
    re_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Re-enter password is a required field"),
    terms_condition: Yup.boolean().oneOf(
      [true],
      "Please accept terms and conditions"
    ),
  });
}