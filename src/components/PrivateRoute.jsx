/** @format */

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedIn } from "../redux/selectors";

export function PrivateRoute({ Component, redirectPath }) {
  const isLoggedIn = useSelector(selectLoggedIn);
  return isLoggedIn ? Component : <Navigate to={redirectPath} />;
}
