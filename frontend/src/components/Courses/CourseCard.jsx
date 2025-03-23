import React from "react";
import { Card, ProgressBar, Badge } from "react-bootstrap";
import { FaClock, FaBook, FaUsers } from "react-icons/fa";

const CourseCard = ({ course }) => {
  if (!course) {
    return <div className="text-danger">لم يتم العثور على بيانات الدورة</div>;
  }

  return (
    <Card className="mb-4 h-100">
      <Card.Img
        variant="top"
        src={course?.course_img || 'default-image.jpg'}
        alt={course?.title || "عنوان غير متوفر"}
        style={{ height: "160px", objectFit: "cover" }}
      />
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{course?.title || "عنوان غير متوفر"}</Card.Title>
          <Badge bg={course?.enrolled ? "success" : "primary"}>
            {course?.enrolled ? "مسجل" : "متاح"}
          </Badge>
        </div>
        <Card.Text className="text-muted mb-3">
          {course?.description || "لا يوجد وصف متاح"}
        </Card.Text>
        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <FaClock className="ms-1 text-muted" />
            <small className="text-muted">{course?.price ?? "غير محدد"} السعر</small>
          </div>
          <div className="d-flex align-items-center">
            <FaBook className="ms-1 text-muted" />
            <small className="text-muted">{course?.chapters ?? 0} دروس</small>
          </div>
          <div className="d-flex align-items-center">
            <FaUsers className="ms-1 text-muted" />
            <small className="text-muted">{course?.students ?? 0} طلاب</small>
          </div>
        </div>
        {course?.enrolled && (
          <div>
            <div className="d-flex justify-content-between mb-1">
              <small>التقدم</small>
              <small>{course?.progress ?? 0}%</small>
            </div>
            <ProgressBar
              now={course?.progress ?? 0}
              className="mb-3"
              style={{ height: "8px" }}
            />
          </div>
        )}
        <Card.Link
          href={
            course?.enrolled
              ? `/my-courses/${course?.id}`
              : `/available-courses/${course?.id}`
          }
          className="btn btn-primary w-100"
        >
          {course?.enrolled ? "متابعة التعلم" : "عرض الدورة"}
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;