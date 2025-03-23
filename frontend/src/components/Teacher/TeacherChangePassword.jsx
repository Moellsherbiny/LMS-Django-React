import { useEffect, useState } from "react";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const TeacherChangePassword = () => {
  const teacherId = localStorage.getItem("teacherId"); //teacher id
  const [teacherData, SetTeacherData] = useState({
    password: "",
  });

  // Change element value

  const handleChange = (event) => {
    SetTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };

  //submit form
  const submitFormData = (event) => {
    event.preventDefault();

    const TeacherFormData = new FormData();
    TeacherFormData.append("password", teacherData.password);

    try {
      axios
        .post(
          baseURL + "teacher/change-password/" + teacherId + "/",
          TeacherFormData
        )
        .then((response) => {
          if (response.status == 200) {
            window.location.href = "/teacher-logout";
          } else {
            alert("Oops...some error occured");
          }
        });
    } catch (error) {
      console.log({ status: error });
    }
  };



  useEffect(() => {
    document.title = "Teacher Changepassword";
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
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
                    value={teacherData.password}
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

export default TeacherChangePassword;
