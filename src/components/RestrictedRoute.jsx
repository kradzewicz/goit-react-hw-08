/** @format */

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedIn } from "../redux/selectors";

export function RestrictedRoute({ Component, redirectPath }) {
  const isLoggedIn = useSelector(selectLoggedIn);
  return isLoggedIn ? <Navigate to={redirectPath} /> : Component;
}
