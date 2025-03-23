import { useEffect, useState } from "react";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const TeacherAddCourses = () => {
  const [catgs, SetCatgs] = useState([]);
  const [courseData, SetcourseData] = useState({
    category: "",
    title: "",
    description: "",
    f_img: "",
    techs: "",
  });

  useEffect(() => {
    document.title = "Teacher add Courses";

    try {
      axios.get(baseURL + "category/").then((res) => {
        SetCatgs(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (event) => {
    SetcourseData({
      ...courseData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    SetcourseData({
      ...courseData,
      [event.target.name]: event.target.files[0],
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    const teacherId = localStorage.getItem("teacherId"); //declared id

    const courseFormData = new FormData();

    courseFormData.append("category", courseData.category);
    courseFormData.append("teacher", teacherId);
    courseFormData.append("title", courseData.title);
    courseFormData.append("description", courseData.description);
    courseFormData.append(
      "featured_img",
      courseData.f_img,
      courseData.f_img.name
    );
    courseFormData.append("techs", courseData.techs);

    try {
      axios
        .post(baseURL + "course/", courseFormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          window.location.href = "/teacher-addcourse";
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Course</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Category</label>
                <div className="col-sm-10">
                  <select
                    value={courseData.category}
                    onChange={handleChange}
                    name="category"
                    className="form-control"
                  >
                    {catgs.map((category, index) => (
                      <option key={index} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Title</label>
                <div className="col-sm-10">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="title"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                  <textarea
                    onChange={handleChange}
                    name="description"
                    type="text"
                    className="form-control"
                    style={{ width: "100%" }}
                  ></textarea>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">
                  Featured Image
                </label>
                <div className="col-sm-10">
                  <input
                    onChange={handleFileChange}
                    name="f_img"
                    type="file"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Technologies</label>
                <div className="col-sm-10">
                  <textarea
                    onChange={handleChange}
                    name="techs"
                    type="text"
                    className="form-control"
                    style={{ width: "100%" }}
                  ></textarea>
                </div>
              </div>
              <hr />
              <button
                type="button"
                onClick={submitForm}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherAddCourses;
