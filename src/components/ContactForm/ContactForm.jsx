/** @format */

import { Field, Form, Formik, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/operations";
import { nanoid } from "@reduxjs/toolkit";
import * as Yup from "yup";
import { selectContacts } from "../../redux/selectors";

const initialValues = {
  name: "",
  number: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(50, "Name is too long!")
    .required("This field is required!"),
  number: Yup.string()
    .min(2, "number is too short!")
    .max(50, "number is too long!")
    .required("This field is required!"),
});

export function ContactFrom() {
  const dispatch = useDispatch();
  const contactsList = useSelector(selectContacts);

  const nameId = nanoid();
  const numberId = nanoid();

  const handleAdd = (values, actions) => {
    const name = values.name;
    const number = values.number;

    const duplicatedContact = contactsList.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicatedContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(
      addContact({
        id: nanoid(),
        name: name,
        number: number,
      })
    );
    actions.resetForm();
  };

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "5px",
        display: "inline-block",
        padding: "20px",
        margin: 10,
      }}>
      <Formik
        onSubmit={handleAdd}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Form>
          <label htmlFor={nameId}>
            <strong>Name</strong>
          </label>
          <br />
          <Field type="text" name="name" id={nameId} />
          <br />
          <ErrorMessage name="name" as="span" />
          <br />
          <br />
          <label htmlFor={numberId}>
            <strong>Number</strong>
          </label>
          <br />
          <Field type="tel" name="number" id={numberId} />
          <br />
          <ErrorMessage name="number" as="span" />
          <br />
          <br />
          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    </div>
  );
}
