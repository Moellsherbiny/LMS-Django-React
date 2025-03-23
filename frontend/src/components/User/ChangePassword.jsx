import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
// import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const ChangePassword = () => {
  const studentId = localStorage.getItem("studentId"); //student id
  const [studentData, SetstudentData] = useState({
    password: "",
  });

  // Change element value

  const handleChange = (event) => {
    SetstudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };

  //submit form
  const submitFormData = (event) => {
    event.preventDefault();

    const StudentFormData = new FormData();
    StudentFormData.append("password", studentData.password);

    try {
      axios
        .post(
          baseURL + "student/change-password/" + studentId + "/",
          StudentFormData
        )
        .then((response) => {
          if (response.status == 200) {
            window.location.href = "/user-logout";
          } else {
            alert("Oops...some error occured");
          }
        });
    } catch (error) {
      console.log({ status: error});
    }
  };

  //redirect to login

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus != "true") {
    window.location.href = "/student-logout";
  }

  useEffect(() => {
    document.title = "Student Changepassword";
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Change Password</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  New Password
                </label>
                <div className="col-sm-10">
                  <input
                    value={studentData.password}
                    onChange={handleChange}
                    name="password"
                    type="text"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <hr />
              <button onClick={submitFormData} className="btn btn-primary">
                Change Password
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChangePassword;
