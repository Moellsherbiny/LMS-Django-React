import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, isAuth } from "../redux/slices/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of redirect
  const { error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(isAuth()); // Check if user is authenticated on mount
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/u/dashboard"); // Redirect to home if user is logged in
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ username, password });

    dispatch(loginAsync({ username, password }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#f9d423" }}>اسم المستخدم</Form.Label>
          <Form.Control
            className="text-white"
            type="text"
            placeholder="اكتب اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label style={{ color: "#f9d423" }}>كلمة المرور</Form.Label>
          <Form.Control
            type="password"
            className="text-white"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </Form.Group>

        <Button type="submit" style={buttonStyle} className="w-100 mb-3">
          تسجيل الدخول
        </Button>
        <div className="text-center" style={{ color: "#ff69b4" }}>
          ليس لدي حساب؟{" "}
          <Link to="/auth/register" style={linkStyle}>
            إنشاء حساب جديد
          </Link>
        </div>
      </Form>
    </>
  );
};

const inputStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  color: "#fff",
  borderRadius: "10px",
};

const buttonStyle = {
  background: "linear-gradient(45deg, #ff6b6b 0%, #ff8e53 100%)",
  border: "none",
  fontWeight: "600",
  borderRadius: "10px",
  padding: "12px",
  transition: "transform 0.2s",
};

const linkStyle = {
  color: "#ff69b4",
  fontWeight: "600",
  textDecoration: "none",
  ":hover": {
    textDecoration: "underline",
  },
};

export default Login;
