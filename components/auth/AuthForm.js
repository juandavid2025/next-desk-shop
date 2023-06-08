import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import { useFormik } from "formik";
import { loginSchema, signupSchema } from "@/helper/schemas";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import styles from "./AuthForm.module.css";

async function signupUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function AuthForm({ authMode = "login" }) {
  const router = useRouter();
  const isLogin = authMode === "login";

  const onSubmitHandler = async (values, actions) => {
    if (isLogin) {
      // Login
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (!result.error) {
        router.replace("/");
      }
    } else {
      try {
        const result = await signupUser(values.email, values.password);
        console.log(result);
        actions.resetForm();
      } catch (err) {
        console.log("error");
        console.log(err);
      }
    }
  };

  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: isLogin ? loginSchema : signupSchema,
    onSubmit: onSubmitHandler,
  });

  const buttonDisable =
    !!errors.email ||
    !!errors.password ||
    !!errors.confirmPassword ||
    isSubmitting;

  let buttonText = isLogin ? "Sign In" : "Register";
  if (isSubmitting) {
    buttonText = "Loading...";
  }

  function changeFormModeHandler() {
    router.replace(`/auth/${isLogin ? "signup" : "login"}`);
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Signup"}</h2>
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="standard"
          className={styles.textField}
          color="secondary"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.email && touched.email}
          helperText={touched.email ? errors.email : ""}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          className={styles.textField}
          color="secondary"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.password && touched.password}
          helperText={touched.password ? errors.password : ""}
        />
        {!isLogin && (
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            className={styles.textField}
            color="secondary"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.confirmPassword && touched.confirmPassword}
            helperText={touched.confirmPassword ? errors.confirmPassword : ""}
          />
        )}
        <div className={styles.actions}>
          <Button
            variant="contained"
            color="secondary"
            className={styles.actionButton}
            type="submit"
            disabled={buttonDisable}
          >
            {buttonText}
          </Button>
          {isLogin && (
            <p>
              Don&apos;t have an account?{" "}
              <span onClick={changeFormModeHandler}>Sign-up</span>
            </p>
          )}
          {!isLogin && (
            <p>
              Already have an account?{" "}
              <span onClick={changeFormModeHandler}>Login</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
