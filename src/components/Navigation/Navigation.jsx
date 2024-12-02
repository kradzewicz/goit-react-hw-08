/** @format */

import { useSelector } from "react-redux";
import { LoggedInNav } from "./LoggedInNav";
import { LoggedOutNav } from "./LoggedOutNav";
import css from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { selectLoggedIn } from "../../redux/selectors";

export function Navigation() {
  const isLoggedIn = useSelector(selectLoggedIn);
  return (
    <div className={css.navBox}>
      <nav className={css.navPages}>
        <Link to="/">Home</Link>
        {isLoggedIn && <Link to="contacts">Contacts</Link>}
      </nav>
      {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
    </div>
  );
}
