import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";

const baseURL = "http://127.0.0.1:8000/api/";

const Userlist = () => {
  const teacherId = localStorage.getItem("teacherId");
  const [studentData, SetstudentData] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(baseURL + "fetch-all-enroll_students/" + teacherId)
        .then((res) => {
          SetstudentData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    document.title = "Teacher userlist";
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Student List</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Intrested Category</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.student.full_name}</td>
                      <td> {row.student.email} </td>
                      <td> {row.student.username} </td>

                      <td>{row.student.intrested_categories}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Userlist;
