/** @format */
import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/operations";
import DocumentTitle from "../components/DocumentTitle";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("This should be email!")
    // .min(2, "Name is too short!")
    // .max(50, "Name is too long!")
    .required("This field is required!"),
  password: Yup.string()
    // .min(2, "number is too short!")
    // .max(50, "number is too long!")
    .required("This field is required!"),
});

const initialValues = {
  email: "",
  password: "",
};

const emailFieldId = nanoid();
const passwordFieldId = nanoid();

export default function Login() {
  const dispatch = useDispatch();

  const handleLogin = (values, actions) => {
    dispatch(logIn({ email: values.email, password: values.password }));
    actions.resetForm();
  };

  return (
    <>
      <DocumentTitle>Login</DocumentTitle>
      <div
        style={{
          padding: "30px",
        }}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          validationSchema={validationSchema}>
          <Form>
            <div>
              <label htmlFor={emailFieldId}>
                <strong>Email</strong>
              </label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" as="span" />
            </div>
            <div>
              <label htmlFor={passwordFieldId}>
                <strong>Password</strong>
              </label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" as="span" />
            </div>
            <button type="submit">Login</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
