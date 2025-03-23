import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000/api/auth/register/";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    role: "student",
    password: "",
    confirmPassword: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Submit form
  const submitForm = async (event) => {
    event.preventDefault();

    // تحقق من أن جميع الحقول ممتلئة
    for (let key in formData) {
      if (!formData[key]) {
        setStatus({ type: "error", message: "جميع الحقول مطلوبة." });
        return;
      }
    }

    // تحقق من تطابق كلمتي المرور
    if (formData.password !== formData.confirmPassword) {
      setStatus({ type: "error", message: "كلمتا المرور غير متطابقتين!" });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        email: formData.email,
        role: formData.role,
        password: formData.password,
        teacher_code: "teacherUser",
      };

      const response = await axios.post(baseURL, payload);
      console.log(response.data);
      navigate("/auth/login");
      setFormData({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        role: "student",
        password: "",
        confirmPassword: "",
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
    document.title = "تسجيل مستخدم جديد";
  }, []);

  return (
    <div dir="rtl">
      {status.message && (
        <Alert variant={status.type === "success" ? "success" : "danger"}>
          {status.message}
        </Alert>
      )}
      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#f9d423" }}>الاسم الأول</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="أدخل الاسم الأول"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#f9d423" }}>اسم العائلة</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="أدخل اسم العائلة"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#f9d423" }}>اسم المستخدم</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="أدخل اسم المستخدم"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#f9d423" }}>
            البريد الإلكتروني
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="أدخل البريد الإلكتروني"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#f9d423" }}>نوع الحساب</Form.Label>
          <Form.Select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="student">طالب</option>
            <option value="teacher">معلم</option>
            <option value="parent">ولي أمر</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#f9d423" }}>كلمة المرور</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="أدخل كلمة المرور"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label style={{ color: "#f9d423" }}>
            تأكيد كلمة المرور
          </Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="أعد إدخال كلمة المرور"
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button type="submit" style={styles.button} className="w-100 mb-3">
            {loading ? <Spinner animation="border" size="sm" /> : "تسجيل"}
          </Button>
        </div>

        <div className="text-center mt-3">
          <small style={styles.linkText}>
            لديك حساب بالفعل؟{" "}
            <Link style={styles.link} to="/auth/login">
              تسجيل الدخول
            </Link>
          </small>
        </div>
      </Form>
    </div>
  );
};
const styles = {
  label: {
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  input: {
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "white",
    padding: "0.75rem",
    borderRadius: "10px",
  },
  button: {
    background: "linear-gradient(45deg, #f9d423 0%, #ff4e50 100%)",
    border: "none",
    fontWeight: "600",
    borderRadius: "10px",
    padding: "0.75rem",
  },
  linkText: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  link: {
    color: "#ff69b4",
    textDecoration: "none",
    fontWeight: "600",
  },
};
export default RegisterForm;
