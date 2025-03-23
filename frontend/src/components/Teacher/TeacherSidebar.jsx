import React from "react";
import { Link } from "react-router-dom";

const TeacherSidebar = () => {
  return (
    <div className="card">
      <div className="list-group list-group-flush">
        <Link
          to={"/teacher-dashboard"}
          className="list-group-item list-group-item-action"
        >
          Dashboard
        </Link>
        <Link
          to={"/teacher-courses"}
          className="list-group-item list-group-item-action"
        >
          My courses
        </Link>
        <Link
          to={"/teacher-addcourse"}
          className="list-group-item list-group-item-action"
        >
          Add courses
        </Link>
        <Link
          to={"/teacher-myusers"}
          className="list-group-item list-group-item-action"
        >
          My users
        </Link>
        <Link
          to={"/teacher-profile-settings"}
          className="list-group-item list-group-item-action"
        >
          Profile Settings
        </Link>
        <Link
          to={"/teacher-changepassword"}
          className="list-group-item list-group-item-action"
        >
          Change Password
        </Link>
        <Link
          to={"/teacher-login"}
          className="list-group-item list-group-item-action text-danger"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default TeacherSidebar;
