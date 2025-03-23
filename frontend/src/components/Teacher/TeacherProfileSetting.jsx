import { useEffect, useState } from "react";
import TeacherSidebar from "./TeacherSidebar";
// import { useParams } from "react-router-dom";
// import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const TeacherProfileSetting = () => {
  const teacherId = localStorage.getItem("teacherId"); //teacher id
  const [teacherData, SetTeacherData] = useState({
    full_name: "",
    email: "",
    qualification: "",
    mobileno: "",
    skills: "",
    profile_img: "",
    p_img: "",
    status: "",
  });

  useEffect(() => {
    document.title = "Teacher add Courses";

    // fetch current teacher data...
    try {
      axios.get(baseURL + "teacher/" + teacherId).then((res) => {
        SetTeacherData({
          full_name: res.data.title,
          email: res.data.email,
          qualification: res.data.qualification,
          mobileno: res.data.mobileno,
          skills: res.data.skills,
          profile_img: res.data.profile_img,
          p_img: "",
        });
      });
    } catch (error) {
      console.log(error);
    }

    //end..
  }, []);

  // Change element value

  const handleChange = (event) => {
    SetTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    SetTeacherData({
      ...teacherData,
      [event.target.name]: event.target.files[0],
    });
  };

  //submit form
  const submitFormData = (event) => {
    event.preventDefault();

    const TeacherFormData = new FormData();
    TeacherFormData.append("full_name", teacherData.full_name);
    TeacherFormData.append("email", teacherData.email);
    TeacherFormData.append("qualification", teacherData.qualification);
    TeacherFormData.append("mobileno", teacherData.mobile_no);
    TeacherFormData.append("skills", teacherData.skills);
    if (teacherData.p_img !== "") {
      TeacherFormData.append(
        "profile_img",
        teacherData.p_img,
        teacherData.p_img.name
      );
    }

    try {
      axios
        .put(baseURL + "teacher/" + teacherId + "/", TeacherFormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
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

  // redirect to the dashboard

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus != "true") {
    window.location.href = "/teacher-login";
  }

  useEffect(() => {
    document.title = "Teacher profile setting";
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile settings</h5>
            <div className="card-body">
              <Form onSubmit={submitFormData}>
                <Form.Group className="mb-3">
                  <Form.Label>Fullname</Form.Label>
                  <Form.Control
                    value={teacherData.full_name}
                    onChange={handleChange}
                    name="full_name"
                    type="text"
                    placeholder="Enter Fullname"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={teacherData.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Profile photo</Form.Label>
                  <Form.Control
                    onChange={handleFileChange}
                    name="p_img"
                    type="file"
                  />
                  {teacherData.profile_img && (
                    <img
                      src={teacherData.profile_img}
                      width={"300"}
                      alt={teacherData.full_name}
                    />
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control
                    value={teacherData.qualification}
                    onChange={handleChange}
                    name="qualification"
                    type="text"
                    placeholder="Enter qualification"
                  />
                  <div className=" form-text">BCA,Btech,MCA,etc</div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    value={teacherData.mobileno}
                    onChange={handleChange}
                    name="mobileno"
                    type="text"
                    placeholder="Enter mobile number"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Skills</Form.Label>
                  <textarea
                    value={teacherData.skills}
                    onChange={handleChange}
                    name="skills"
                    className="form-control"
                  ></textarea>
                  <div className=" form-text">Php,Python,Javascript,etc</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
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

export default TeacherProfileSetting;
