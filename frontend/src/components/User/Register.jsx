import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/auth/register/";

const Register = () => {
  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    password: "",
    username: "",
    role: "teacher" | "parent",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };

  // Submit form
  const submitForm = async (event) => {
    event.preventDefault();

    // Validate all fields
    for (let key in studentData) {
      if (!studentData[key]) {
        setStatus({ type: "error", message: "جميع الحقول مطلوبة." });
        return;
      }
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await axios.post(baseURL, studentData);
      console.log(response.data);

      setStudentData({
        full_name: "",
        email: "",
        password: "",
        username: "",
      });

      setStatus({ type: "success", message: "تم التسجيل بنجاح!" });
    } catch (error) {
      console.error("خطأ أثناء التسجيل:", error);
      setStatus({ type: "error", message: "فشل التسجيل. حاول مرة أخرى!" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "تسجيل الطالب";
  }, []);

  return (
    <Container className="mt-4" dir="rtl">
      <Row className="justify-content-center">
        <Col md={6}>
          {status.message && (
            <Alert variant={status.type === "success" ? "success" : "danger"}>
              {status.message}
            </Alert>
          )}
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white text-center">
              <h5>تسجيل المستخدم</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={submitForm}>
                <Form.Group className="mb-3">
                  <Form.Label>الاسم الكامل</Form.Label>
                  <Form.Control
                    value={studentData.full_name}
                    onChange={handleChange}
                    name="full_name"
                    type="text"
                    placeholder="أدخل الاسم الكامل"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>البريد الإلكتروني</Form.Label>
                  <Form.Control
                    value={studentData.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="أدخل البريد الإلكتروني"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>اسم المستخدم</Form.Label>
                  <Form.Control
                    value={studentData.username}
                    onChange={handleChange}
                    name="username"
                    type="text"
                    placeholder="أدخل اسم المستخدم"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>كلمة المرور</Form.Label>
                  <Form.Control
                    value={studentData.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    required
                  />
                </Form.Group>

                <Form.Select
                  name="role"
                  onChange={handleChange}
                  aria-label="teacher"
                  required
                >
                  <option>افتح القائمة لاختيار دورك</option>
                  <option value="teacher">مدرس</option>
                  <option value="parent">ولي أمر</option>
                </Form.Select>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "تسجيل"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
