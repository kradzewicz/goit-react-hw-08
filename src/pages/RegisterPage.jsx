/** @format */
import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { register } from "../redux/operations";
import DocumentTitle from "../components/DocumentTitle";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("This field is required!"),
  email: Yup.string()
    .email("This should be email!")
    .required("This field is required!"),
  password: Yup.string().required("This field is required!"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const nameFieldId = nanoid();
const emailFieldId = nanoid();
const passwordFieldId = nanoid();

export default function Register() {
  const dispatch = useDispatch();

  const handleRegister = (values, actions) => {
    console.log({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
    // actions.resetForm();
  };

  return (
    <>
      <DocumentTitle>Register</DocumentTitle>
      <div
        style={{
          padding: "30px",
        }}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleRegister}
          validationSchema={validationSchema}>
          <Form>
            <div>
              <label htmlFor={nameFieldId}>
                <strong>Name</strong>
              </label>
              <Field type="name" name="name" id={nameFieldId} />
              <ErrorMessage name="name" as="span" />
            </div>
            <div>
              <label htmlFor={emailFieldId}>
                <strong>Email</strong>
              </label>
              <Field type="email" name="email" id={emailFieldId} />
              <ErrorMessage name="email" as="span" />
            </div>
            <div>
              <label htmlFor={passwordFieldId}>
                <strong>Password</strong>
              </label>
              <Field type="password" name="password" id={passwordFieldId} />
              <ErrorMessage name="password" as="span" />
            </div>
            <button type="submit">Register</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
