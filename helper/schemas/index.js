import * as yup from "yup";

const passwordRules = /^([a-zA-Z0-9]{7})$/; // min 7 characters
const passwordPwfRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/; // min 7 characters, 1 upper case, 1 lower case, 1 numeric

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(7)
    .matches(passwordRules, {
      message: "Password must have min 7 characters",
    })
    .required("Required"),
});

export const signupSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(7)
    .matches(passwordRules, {
      message: "Password must have min 7 characters",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
