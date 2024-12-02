/** @format */

import { Link } from "react-router-dom";
import DocumentTitle from "../components/DocumentTitle";

export function NotFoundPage() {
  return (
    <>
      <DocumentTitle>NotFound</DocumentTitle>
      <Link to="/">
        <h2>Something went wrong... Click me to back.</h2>
      </Link>
    </>
  );
}
