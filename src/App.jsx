/** @format */

import "./App.css";
import { ContactFrom } from "./components/ContactForm/ContactForm";
import { SearchBox } from "./components/SearchBox";
import { ContactList } from "./components/ContactList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "./redux/operations";
import { selectError, selectIsLoading } from "./redux/selectors";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phone Book</h1>
      <ContactFrom />
      <SearchBox />
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactList />
    </>
  );
}

export default App;
