import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaHome,
  FaBook,
  FaClipboardList,
  FaQuestionCircle,
  FaGraduationCap,
} from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div
      className="fixed top-0 right-0 d-flex flex-column p-3"
      dir="rtl"
      style={{
        width: "400px",
        height: "100vh",
        backgroundColor: "#fff",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
        overflowY: "auto",
        transition: "transform 0.3s ease-in-out",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <div className="text-center mb-4">
        <h4 className="fw-bold" style={{ color: "var(--primary-blue)" }}>
          EduSparkle
        </h4>
        <p className="text-muted">مرحباً {user?.name || "طالب"}</p>
      </div>
      <div className="d-flex flex-column">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""} text-decoration-none mb-2`
          }
        >
          <FaHome className="sidebar-icon" /> لوحة التحكم
        </NavLink>
        <NavLink
          to="/available-courses"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""} text-decoration-none mb-2`
          }
        >
          <FaGraduationCap className="sidebar-icon" /> الدورات المتاحة
        </NavLink>
        <NavLink
          to="/my-courses"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""} text-decoration-none mb-2`
          }
        >
          <FaBook className="sidebar-icon" /> دوراتي
        </NavLink>
        <NavLink
          to="/assignments"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""} text-decoration-none mb-2`
          }
        >
          <FaClipboardList className="sidebar-icon" /> الواجبات
        </NavLink>
        <NavLink
          to="/quizzes"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""} text-decoration-none mb-2`
          }
        >
          <FaQuestionCircle className="sidebar-icon" /> الاختبارات
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
