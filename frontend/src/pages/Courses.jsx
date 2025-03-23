import React, { useEffect } from "react";
import { Row, Col, Container, Badge, Card, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableCourses } from "../redux/slices/coursesSlice";
import { Link } from "react-router-dom";

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { availableCourses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchAvailableCourses());
  }, [dispatch]);

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return <Badge bg="success">مبتدئ</Badge>;
      case "intermediate":
        return <Badge bg="warning">متوسط</Badge>;
      case "advanced":
        return <Badge bg="danger">متقدم</Badge>;
      default:
        return <Badge bg="secondary">غير محدد</Badge>;
    }
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">حدث خطأ أثناء تحميل الدورات: {error}</Alert>
      </Container>
    );
  }

  if (!availableCourses || availableCourses.length === 0) {
    return (
      <Container className="mt-4 text-center">
        <Alert variant="warning">لا توجد دورات متاحة حاليًا.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">الدورات المتاحة</h1>
      <Row>
        {availableCourses.map((course) => (
          <Col key={course.id} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={course.course_img || "https://via.placeholder.com/300x200?text=صورة+الدورة"}
                style={{ height: "200px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x200?text=صورة+الدورة";
                }}
              />
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  {getDifficultyBadge(course.difficulty)}
                  <small className="text-muted">المدرس: {course.teacher_name || "غير معروف"}</small>
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    {course.price === "0.00" || course.price === 0 ? "مجاني" : `${course.price} دولار`}
                  </small>
                  <Link to={`/u/course/${course.id}`} className="btn btn-primary btn-sm">
                    عرض التفاصيل
                  </Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CoursesPage;
