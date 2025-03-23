import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="card">
      <div className="list-group list-group-flush">
        <Link
          to={"/user-dashboard"}
          className="list-group-item list-group-item-action"
        >
          Dashboard
        </Link>
        <Link
          to={"/mycourses"}
          className="list-group-item list-group-item-action"
        >
          My courses
        </Link>

        <Link
          to={"/recommended-courses"}
          className="list-group-item list-group-item-action"
        >
          Recommended Courses
        </Link>
        <Link
          to={"/profile-settings"}
          className="list-group-item list-group-item-action"
        >
          Profile Settings
        </Link>
        <Link
          to={"/changepassword"}
          className="list-group-item list-group-item-action"
        >
          Change Password
        </Link>
        <Link
          to={"/user-logout"}
          className="list-group-item list-group-item-action text-danger"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
