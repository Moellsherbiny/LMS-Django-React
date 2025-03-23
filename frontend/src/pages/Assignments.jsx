import React, { useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignments } from "../redux/slices/assignmentsSlices";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/ar"; // دعم اللغة العربية

const Assignments = () => {
  const dispatch = useDispatch();
  const { assignments, loading, error } = useSelector(
    (state) => state.assignments
  );

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  return (
    <Container>
      <h2 className="text-center my-4">الواجبات الدراسية</h2>

      {/* حالة التحميل */}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>جاري تحميل البيانات...</p>
        </div>
      )}

      {/* حالة الخطأ */}
      {error && (
        <Alert variant="danger">حدث خطأ أثناء تحميل البيانات: {error}</Alert>
      )}
      {assignments.length === 0 ? (
        <Alert variant="info">لم يتوفر لديك واجبات حتي الآن ...</Alert>
      ) : (
        <Row>
          {assignments.map((assignment) => (
            <Col key={assignment.id} md={4}>
              <Card className="assignment-card">
                <Card.Body>
                  <Card.Title>{assignment.title}</Card.Title>
                  <Card.Text>{assignment.description}</Card.Text>
                  {/* تنسيق التاريخ باستخدام moment */}
                  <Card.Text className="text-muted">
                    تاريخ التسليم:{" "}
                    {moment(assignment.due_date)
                      .locale("ar")
                      .format("DD MMMM YYYY, hh:mm A")}
                  </Card.Text>
                  <Link to={`/u/assignment/${assignment.id}`}>
                    <Button variant="primary">عرض الواجب</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Assignments;
