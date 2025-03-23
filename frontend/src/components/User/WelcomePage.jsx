import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const WelcomePage = () => {
  const studentId = localStorage.getItem("studentId");
  const [studentData, SetstudentData] = useState("");
  useEffect(() => {
    // fetch current teacher data...
    try {
      axios.get(baseURL + "student/" + studentId).then((res) => {
        console.log(res.data);

        SetstudentData(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    //end..
  }, []);
  useEffect(() => {
    document.title = "Student Dashboard";
  }, []);
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        {studentData ? (
          <>
            <h1 className="display-4">Welcome, {studentData.full_name}!</h1>
            <p className="lead">We're glad to have you back.</p>
            <a href="/dashboard" className="btn btn-primary mt-3">
              Go to Dashboard
            </a>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
