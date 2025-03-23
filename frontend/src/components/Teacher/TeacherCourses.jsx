import { useEffect, useState } from "react";
import TeacherSidebar from "./TeacherSidebar";
import { Link } from "react-router-dom";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const TeacherCourses = () => {
  const [courseData, SetcourseData] = useState([]);

  //local storage..

  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    try {
      document.title = "Teacher Courses";

      axios.get(baseURL + "teacher-courses/" + teacherId).then((res) => {
        SetcourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [teacherId]);

  return (
    <div className="container mt-4" style={{ marginTop: 100 }}>
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Total Enrolled</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((courses, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={"/all-chapters/" + courses.id}>
                          {courses.title}
                        </Link>
                        <hr />
                        {courses.course_rating && (
                          <span>Rating: {courses.course_rating}/5</span>
                        )}
                        {!courses.course_rating && <span>Rating:0/5</span>}
                      </td>
                      <td>
                        <img
                          src={courses.featured_img}
                          width={"80"}
                          className="rounded"
                          alt={courses.title}
                        />
                      </td>
                      <td>
                        <Link to={"/enrolled-students/" + courses.id}>
                          {courses.total_enrolled_students}
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="btn btn-info btn-sm ms-2"
                          to={"/edit-course/" + courses.id}
                        >
                          Update
                        </Link>
                        <Link
                          className="btn btn-success btn-sm ms-2"
                          to={"/addchapter/" + courses.id}
                        >
                          Add chapters
                        </Link>
                        <button className="btn btn-danger btn-sm  ms-2">
                          Delete
                        </button>
                      </td>
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

export default TeacherCourses;
