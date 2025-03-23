import { Container, Row, Col } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const AuthLayout = () => {
  const location = useLocation();
  const isAuth = useSelector((state) => state.auth.isAuth);
  
  useEffect(() => {
    // You might have a navbar element with id 'mainNavbar'
    const navbar = document.getElementById("mainNavbar");
    if (navbar) {
      navbar.style.display = "none";
    }

    // Cleanup function to show navbar when leaving auth pages
    return () => {
      if (navbar) {
        navbar.style.display = "flex";
      }
    };
  }, []);
  if (isAuth) return <Navigate to={"/u/dashboard"} replace />;

  // Determine which page we're on to show appropriate title
  const isLoginPage =
    location.pathname === "/auth/login" || location.pathname === "/";
  const pageName = isLoginPage ? "تسجيل الدخول" : "إنشاء حساب جديد";

  return (
    <div style={styles.background}>
      {/* Top space */}
      <div style={styles.spacer}></div>

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} xl={5}>
            <div style={styles.glassContainer}>
              <Link to="/" className="text-decoration-none">
                <h1 className="text-center mb-3" style={styles.title}>
                  Edu<span style={styles.titleSparkle}>Sparkle</span>
                </h1>
              </Link>

              <p className="text-center mb-4" style={styles.subtitle}>
                {pageName}
              </p>

              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Bottom space */}
      <div style={styles.spacer}></div>
    </div>
  );
};

const styles = {
  background: {
    background: "linear-gradient(135deg, #0a1930 0%, #1a365d 100%)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  spacer: {
    flex: "1",
    minHeight: "50px",
  },
  glassContainer: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "2.5rem 2rem",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    marginBottom: "30px",
    marginTop: "30px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    background: "linear-gradient(45deg, #f9d423 0%, #ff4e50 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 20px rgba(249, 212, 35, 0.3)",
    marginBottom: "0.25rem",
  },
  titleSparkle: {
    color: "#ff69b4",
    textShadow: "0 0 15px rgba(255, 105, 180, 0.5)",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "1.2rem",
    fontWeight: "500",
  },
};

export default AuthLayout;
