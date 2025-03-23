import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../navbar-styles.css";
import { Link } from "react-router-dom";

export const PublicNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      id="mainNavbar"
      expand="lg"
      fixed="top"
      className={`public-navbar ${isScrolled ? "navbar-scrolled" : ""} `}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <div className="d-flex align-items-center">
            <span className="logo-text me-2">Sparkle</span>
            <div className="logo-icon p-3 me-1">
              <i className="fas fa-graduation-cap">Edu</i>
            </div>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="public-navbar-nav" />
        <Navbar.Collapse id="public-navbar-nav">
          <Nav className="mx-auto text-center">
            <Nav.Link as={Link} to="/" className="nav-link-item">
              الرئيسية
            </Nav.Link>
            <Nav.Link to="/#features" className="nav-link-item">
              المميزات
            </Nav.Link>
            <Nav.Link as={Link} to="#about" className="nav-link-item">
              عن المنصة
            </Nav.Link>
          
          </Nav>

          <div className="d-flex auth-buttons flex-column flex-lg-row">
            <Button
              variant="outline-primary"
              className="login-btn ms-lg-2 mb-2 mb-lg-0"
            >
              <Link
                to="/auth/login"
                className={`btn-link ${
                  isScrolled ? "text-primary" : "text-white"
                } `}
              >
                تسجيل الدخول
              </Link>
            </Button>
            <Button variant="primary" className="register-btn">
              <Link to="/auth/register" className="btn-link text-white">
                إنشاء حساب
              </Link>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNavbar;
