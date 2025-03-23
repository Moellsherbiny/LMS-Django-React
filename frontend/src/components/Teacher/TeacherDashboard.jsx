import { useEffect, useState } from "react";
import TeacherSidebar from "./TeacherSidebar";
// import Swal from "sweetalert2";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000/api/";

const TeacherDashboard = () => {
  const [dashboardData, SetdashboardData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  try {
    axios.get(baseURL + "teacher/dashboard/" + teacherId).then((response) => {
      SetdashboardData(response.data);
    });
  } catch  {
    console.log({ status: "error" });
  }
  useEffect(() => {
    document.title = "Teacher Dashboard";
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="row">
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-primary text-white">
                  Total Courses
                </h5>
                <div className="card-body">
                  <h3>
                    <Link to={"/teacher-courses"}>
                      {dashboardData.total_teacher_courses}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-primary text-white">
                  Total Students
                </h5>
                <div className="card-body">
                  <h3>
                    <Link to={"/teacher-myusers"}>
                      {dashboardData.total_teacher_students}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-primary text-white">
                  Total Chapters
                </h5>
                <div className="card-body">
                  <h3>
                    <Link to={"/teacher-myusers"}>
                      {dashboardData.total_teacher_chapters}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherDashboard;
