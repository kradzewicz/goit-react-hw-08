/** @format */

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import { selectIsRefresh } from "./redux/selectors";
import { refreshUser } from "./redux/operations";

const Home = lazy(() => import("./pages/HomePage"));
const Contacts = lazy(() => import("./pages/ContactsPage"));
const Register = lazy(() => import("./pages/RegisterPage"));
const Login = lazy(() => import("./pages/LoginPage"));

function App() {
  const dispatch = useDispatch();
  const refresh = useSelector(selectIsRefresh);

  useEffect(() => {
    dispatch(refreshUser());
  }, []);

  if (refresh) {
    return <h2>Refreshing...</h2>;
  }

  return (
    <>
      {/* {isLoading && !error && <b>Request in progress...</b>} */}
      <Navigation />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectPath="/login" Component={<Contacts />} />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectPath="/contacts"
                Component={<Register />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectPath="/contacts" Component={<Login />} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
