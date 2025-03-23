import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrolledCourses } from "../redux/slices/coursesSlice";
import { Link } from "react-router-dom";

function MyCourses() {
  const dispatch = useDispatch();
  const { enrolledCourses, loading, error } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    dispatch(fetchEnrolledCourses());
  }, [dispatch]);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">المواد المسجلة</h2>

      {enrolledCourses.length === 0 ? (
        <Alert variant="info">لم تسجل في أي مادة بعد.</Alert>
      ) : (
        <Row>
          {enrolledCourses.map((course) => (
            <Col key={course.id} md={4} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={course.course_img}
                  alt={course.title}
                  style={{ height: "180px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x180?text=صورة+المادة";
                  }}
                />
                <Card.Body>
                  <Card.Title className="fs-5">{course.title}</Card.Title>
                  <Card.Text>
                    المدرس: <strong>{course.teacher_name}</strong>
                  </Card.Text>
                  <Button
                    as={Link}
                    to={`/u/mycourse/${course.id}`}
                    variant="primary"
                    className="w-100"
                  >
                    مشاهدة المادة
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default MyCourses;
