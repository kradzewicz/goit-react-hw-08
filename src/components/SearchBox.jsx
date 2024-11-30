/** @format */
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { filterContacts } from "../redux/filterSlice";

export function SearchBox({}) {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "5px",
        display: "inline-block",
        padding: "0px 20px 20px",
        margin: 10,
      }}>
      <Formik>
        <Form>
          <p>Search by name:</p>
          <Field
            type="text"
            onChange={(e) => dispatch(filterContacts(e.target.value))}
          />
        </Form>
      </Formik>
    </div>
  );
}
