import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
// import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const ProfileSettings = () => {
  const studentId = localStorage.getItem("studentId"); //teacher id
  const [studentData, SetstudentData] = useState({
    full_name: "",
    email: "",
    username: "",
    intrested_categories: "",
    status: "",
  });

  useEffect(() => {
    // fetch current teacher data...
    try {
      axios.get(baseURL + "student/" + studentId).then((res) => {
        SetstudentData({
          full_name: res.data.full_name,
          email: res.data.email,
          username: res.data.username,
          intrested_categories: res.data.intrested_categories,
        });
      });
    } catch (error) {
      console.log(error);
    }

    //end..
  }, [studentId]);

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
    StudentFormData.append("full_name", studentData.full_name);
    StudentFormData.append("email", studentData.email);
    StudentFormData.append("username", studentData.qualification);
    StudentFormData.append(
      "intrested_categories",
      studentData.intrested_categories
    );

    try {
      axios
        .put(baseURL + "student/" + studentId + "/", StudentFormData)
        .then((response) => {
          if (response.status == 200) {
            // Swal.fire({
            //   title: "Data has been updated",
            //   icon: "success",
            //   toast: true,
            //   timer: 3000,
            //   position: "top-right",
            //   timerProgressBar: true,
            //   showConfirmButton: false,
            // });
          }
        });
    } catch (error) {
      console.log({ status: error });
    }
  };

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus != "true") {
    window.location.href = "/student-logout";
  }

  useEffect(() => {
    document.title = "Student profile setting";
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile settings</h5>
            <div className="card-body">
              <Form onSubmit={submitFormData}>
                <Form.Group className="mb-3">
                  <Form.Label>Fullname</Form.Label>
                  <Form.Control
                    value={studentData.full_name}
                    onChange={handleChange}
                    name="full_name"
                    type="text"
                    placeholder="Enter Fullname"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={studentData.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={studentData.username}
                    onChange={handleChange}
                    name="username"
                    type="text"
                    placeholder="Enter qualification"
                  />
                  <div className=" form-text">BCA,Btech,MCA,etc</div>
                </Form.Group>

                {/* <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    value={studentData.mobileno}
                    onChange={handleChange}
                    name="mobileno"
                    type="text"
                    placeholder="Enter mobile number"
                  />
                </Form.Group> */}

                <Form.Group className="mb-3">
                  <Form.Label>Intrest</Form.Label>
                  <textarea
                    value={studentData.intrested_categories}
                    onChange={handleChange}
                    name="intrested_categories"
                    className="form-control"
                  ></textarea>
                  <div className=" form-text">Php,Python,Javascript,etc</div>
                  <hr />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileSettings;
