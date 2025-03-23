import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const baseURL = "http://127.0.0.1:8000/api/";

const TeacherLogin = () => {
  const [teacherLoginData, SetTeacherLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, SeterrorMsg] = useState("");

  const handleChange = (event) => {
    SetTeacherLoginData({
      ...teacherLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    const teacherFormData = new FormData();
    teacherFormData.append("email", teacherLoginData.email);
    teacherFormData.append("password", teacherLoginData.password);

    try {
      axios
        .post(baseURL + "teacher-login", teacherFormData)
        .then((response) => {
          // local storage setup
          if (response.data.bool == true) {
            localStorage.setItem("teacherLoginStatus", true);
            localStorage.setItem("teacherId", response.data.teacher_id);
            window.location.href = "/teacher-dashboard";
          } else {
            SeterrorMsg("Invalid Email or Password");
          }
        });
    } catch (error) {
      console.log(error);
      SeterrorMsg("An error occurred during login. Please try again.");
    }
  };

  // redirect to the dashboard

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus == "true") {
    window.location.href = "/teacher-dashboard";
  }

  useEffect(() => {
    document.title = "Teacher Login";
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Teacher Login</h5>
            <div className="card-body">
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
              <Form onSubmit={submitForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    type="email"
                    value={teacherLoginData.email}
                    name="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    name="password"
                    value={teacherLoginData.password}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
