/** @format */

import { useDispatch, useSelector } from "react-redux";
import css from "./Navigation.module.css";
import { logOut } from "../../redux/operations";
import { selectUser } from "../../redux/selectors";

export function LoggedInNav() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div className={css.navPages}>
      <p>Welcome, {user.name}</p>
      <button type="button" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
}
