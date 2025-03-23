// src/components/layout/Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import NotificationBell from "../common/NotificationBell";

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top gradient-bg">
      <div className="container-fluid">
        <button
          className="btn btn-link text-light d-md-none me-2"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars"></i>
        </button>

        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="fas fa-graduation-cap me-2"></i>
          <span className="fw-bold">EduSparkle</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                لوحة التحكم
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses">
                المقررات
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/assignments">
                الواجبات
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/quizzes">
                الاختبارات
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <NotificationBell />

            <div className="dropdown ms-3">
              <a
                className="dropdown-toggle d-flex align-items-center text-decoration-none text-light"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <img
                  src={user?.profilePic || "/assets/images/avatar.png"}
                  className="rounded-circle me-2"
                  width="32"
                  height="32"
                  alt={user?.name}
                />
                <span>{user?.name}</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    الملف الشخصي
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    تسجيل الخروج
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
