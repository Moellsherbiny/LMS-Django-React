import { useEffect, useState } from "react";
import TeacherSidebar from "../Teacher/TeacherSidebar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const EnrolledUser = () => {
  const [studentData, SetstudentData] = useState([]);
  const { course_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseURL + "fetch_enroll_students/" + course_id).then((res) => {
        SetstudentData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Enrolled Student List</h5>
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

export default EnrolledUser;
