import React from "react";
import Home from "./components/Home";
import { PublicNavbar } from "./components/Navbars";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { isAuth } from "./redux/slices/authSlice";
import AppRoutes from "./routes/Route";
import { Navigate } from "react-router-dom";

const App = () => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthRoute = location.pathname == "auth/";
  const dispatch = useDispatch();
  // const navigate = useNavigate(); // Use useNavigate instead of redirect

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(isAuth()); // Check if user is authenticated on mount
  }, [dispatch, user]);
  console.log(user);
  

  return (
    <>
      {!isAuthRoute ? user ? "" : <PublicNavbar /> : <></>}
      <AppRoutes />
    </>
  );
};

export default App;
