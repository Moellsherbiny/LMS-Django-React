import React from "react";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
const baseURL = "http://127.0.0.1:8000/api/";
import { useParams } from "react-router-dom";

const Addchapter = () => {
  const { course_id } = useParams(); //pass course_id in url for particular chapter...

  const [chapterData, SetchapterData] = useState({
    title: "",
    description: "",
    video: "",
    remarks: "",
  });

  const handleChange = (event) => {
    SetchapterData({
      ...chapterData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    SetchapterData({
      ...chapterData,
      [event.target.name]: event.target.files[0],
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    const courseFormData = new FormData();

    courseFormData.append("course", course_id);
    courseFormData.append("title", chapterData.title);
    courseFormData.append("description", chapterData.description);
    courseFormData.append("video", chapterData.video, chapterData.video.name);
    courseFormData.append("remarks", chapterData.remarks);

    try {
      axios
        .post(baseURL + "chapter/", courseFormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          window.location.href = "/addchapter/1";
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
            <h5 className="card-header">Add Chapters</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Title</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    onChange={handleChange}
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
                <label className="col-sm-2 col-form-label">Video</label>
                <div className="col-sm-10">
                  <input
                    name="video"
                    onChange={handleFileChange}
                    type="file"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Remarks</label>
                <div className="col-sm-10">
                  <textarea
                    onChange={handleChange}
                    name="remarks"
                    placeholder="This video is focused on basic introduction"
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

export default Addchapter;
