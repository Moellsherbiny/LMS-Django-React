import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-3 text-danger">404</h1>
      <h2 className="mb-3 text-dark">الصفحة غير موجودة</h2>
      <p className="text-muted">
        عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
      </p>
      <Button variant="primary" onClick={() => navigate("/")}>
        العودة إلى الصفحة الرئيسية
      </Button>
    </Container>
  );
};

export default NotFoundPage;
