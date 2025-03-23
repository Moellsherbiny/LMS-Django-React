import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  Button,
  Alert,
  Spinner,
  Modal,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourse, enrollInCourse } from "../../redux/slices/coursesSlice";

function CourseDetails() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const dispatch = useDispatch();
  const { currentCourse, loading, error } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    dispatch(fetchCourse(id));
  }, [dispatch, id]);

  const handleEnroll = async () => {
    try {
      const result = await dispatch(enrollInCourse(id)).unwrap(); // لجلب النتيجة مباشرة
      setModalMessage(result.message || "تم التسجيل بنجاح!");
      setShowModal(true);
    } catch (err) {
      setModalMessage(err.message || "حدث خطأ أثناء التسجيل!");
      setShowModal(true);
    }
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
      </Container>
    );
  }
  const getDifficultyText = (difficulty) => {
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
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Ensure `currentCourse` is not null before rendering
  if (!currentCourse) {
    return (
      <Container className="mt-4 text-center">
        <Alert variant="info">لا توجد بيانات متاحة لهذه الدورة.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <Card>
            <Card.Img
              variant="top"
              src={currentCourse?.course_img}
              style={{ maxHeight: "400px", objectFit: "cover" }}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x400?text=صورة+الدورة";
              }}
            />
            <Card.Body>
              <Card.Title className="fs-2">{currentCourse?.title}</Card.Title>
              <div className="mb-3">
                {getDifficultyText(currentCourse?.difficulty)}
                <span className="ms-3">
                  المدرس: {currentCourse?.teacher_name || "غير محدد"}
                </span>
              </div>
              <Card.Text className="fs-5">
                {currentCourse?.description}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header className="fs-4">محتوى الدورة</Card.Header>
            <ListGroup variant="flush">
              {currentCourse?.chapters?.length > 0 ? (
                currentCourse.chapters.map((chapter) => (
                  <ListGroup.Item key={chapter.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="fw-bold">
                          {chapter.order}. {chapter.title}
                        </span>
                        <p className="mb-0 text-muted">{chapter.content}</p>
                      </div>
                      <Badge bg="secondary">{chapter.duration} دقيقة</Badge>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>لم يتم إضافة فصول بعد.</ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header className="fs-4">تفاصيل الدورة</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>السعر:</strong>{" "}
                  {currentCourse?.price === "0.00"
                    ? "مجاني"
                    : `${currentCourse?.price} دولار`}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>تاريخ النشر:</strong>{" "}
                  {currentCourse?.created_at
                    ? new Date(currentCourse.created_at).toLocaleDateString(
                        "ar-EG"
                      )
                    : "غير متاح"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>آخر تحديث:</strong>{" "}
                  {currentCourse?.updated_at
                    ? new Date(currentCourse.updated_at).toLocaleDateString(
                        "ar-EG"
                      )
                    : "غير متاح"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>عدد الفصول:</strong>{" "}
                  {currentCourse?.chapters?.length || 0}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>المدة الإجمالية:</strong>{" "}
                  {currentCourse?.chapters
                    ? currentCourse.chapters.reduce(
                        (acc, chapter) => acc + (chapter.duration || 0),
                        0
                      )
                    : 0}{" "}
                  دقيقة
                </ListGroup.Item>
              </ListGroup>
              <Button
                variant="primary"
                size="lg"
                className="w-100 mt-3"
                onClick={handleEnroll}
              >
                {currentCourse?.price === "0.00"
                  ? "التسجيل الآن (مجاناً)"
                  : "شراء الدورة"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton >
          <Modal.Title className="w-100"> التسجيل</Modal.Title>
        </Modal.Header>
      
        <Modal.Body className="text-success text-center text-2xl">{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CourseDetails;
