import { useEffect, useState } from "react";
import logos from "/src/assets/pys.jpg";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
import axios from "axios";
const baseURL = "http://127.0.0.1:8000/api/";
import { useParams } from "react-router-dom";

const TeacherDetail = () => {
  const [courseData, SetcourseData] = useState([]);
  const [teacherData, SetteacherData] = useState([]);
  const { teacher_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseURL + "teacher/" + teacher_id).then((res) => {
        SetcourseData(res.data.teacher_course);
        SetteacherData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    document.title = "Teacher Detail";
  }, []);
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src={logos} className="thumbnail" />
        </div>
        <div className="col-md-8">
          <h3>{teacherData.full_name}</h3>
          <p>{teacherData.detail}</p>
          <p className="fw-bold">Skills:{teacherData.skills}</p>
          {/* <p className="fw-bold">
            Recent Course: <Link to={"/teacher-detail/1"}>React JS</Link>
          </p> */}
          <p className="fw-bold">Rating:4.5/5</p>
        </div>
      </div>
      {/* course videos */}
      <div className="card mt-4">
        <h5 className="card-header">Course List</h5>
        <div className="list-group list-group-flush">
          {courseData.map((course, index) => (
            <Link
              key={index}
              to={`/detail/${course.id}`}
              className="list-group-item list-group-item-action"
            >
              {course.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;
