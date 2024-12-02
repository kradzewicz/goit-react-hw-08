/** @format */
import { ContactFrom } from "../components/ContactsPanel/ContactForm/ContactForm";
import { SearchBox } from "../components/ContactsPanel/SearchBox";
import { ContactList } from "../components/ContactsPanel/ContactList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectLoggedIn,
} from "../redux/selectors";
import { useEffect } from "react";
import { fetchContacts } from "../redux/operations";
import DocumentTitle from "../components/DocumentTitle";

export default function Contacts() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isLoggedIn = useSelector(selectLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
    return;
  }, [isLoggedIn]);
  return (
    <>
      <DocumentTitle>Contacts</DocumentTitle>
      <ContactFrom />
      <SearchBox />
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactList />
    </>
  );
}
