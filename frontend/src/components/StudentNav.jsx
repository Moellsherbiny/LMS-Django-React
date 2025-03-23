import React from "react";
import { Navbar, Container, Dropdown, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { logoutAsync } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
const TopNavbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <Navbar expand="lg" className="py-2 student-navbar" dir="rtl">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        {/* Brand on the Right */}
        <Navbar.Brand
          className="fw-bold"
          style={{ color: "var(--primary-blue)" }}
        >
          EduSparkle
        </Navbar.Brand>

        {/* Navigation Links for Desktop */}
        <Nav className="mx-auto d-none d-lg-flex">
          <NavLink to="/u/dashboard" className="nav-link">
            الرئيسية
          </NavLink>
          <NavLink to="/u/courses" className="nav-link">
            المواد
          </NavLink>
          <NavLink to="/u/mycourses" className="nav-link">
            المواد المسجلة
          </NavLink>
          <NavLink to="/u/quizzes" className="nav-link">
            الاختبارات
          </NavLink>
          <NavLink to="/u/quizzes/results" className="nav-link">
            النتائج
          </NavLink>
          <NavLink to="/u/assignments" className="nav-link">
            الواجبات
          </NavLink>
        </Nav>

        {/* Navigation Dropdown for Mobile */}
        <div className="d-lg-none mx-auto">
          <Dropdown align="center">
            <Dropdown.Toggle variant="light" id="mobile-nav-dropdown">
              القائمة
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/u/dashboard">
                الرئيسية
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/u/courses">
                المواد
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/u/mycourses">
                المواد المسجلة
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/u/quizzes">
                الاختبارات
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/u/quizzes/results">
                النتائج
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/u/assignments">
                الواجبات
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* User Dropdown on the Left */}
        <div className="d-flex align-items-center">
          <Dropdown align="start">
            <Dropdown.Toggle
              variant="light"
              id="user-dropdown"
              className="d-flex align-items-center border-0"
            >
              <div
                className="rounded-circle bg-light d-flex align-items-center justify-content-center ms-2"
                style={{ width: "35px", height: "35px" }}
              >
                <FaUser />
              </div>
              <span className="d-none d-md-block ms-2">
                {user?.first_name || "طالب"}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>تسجيل الخروج</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
