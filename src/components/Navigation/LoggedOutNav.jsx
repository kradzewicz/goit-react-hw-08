/** @format */

import { Link } from "react-router-dom";
import css from "./Navigation.module.css";

export function LoggedOutNav() {
  return (
    <div className={css.navPages}>
      <Link to="register">Register</Link>
      <Link to="login">Login</Link>
    </div>
  );
}
