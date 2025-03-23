import React, { useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isAuth } from "../redux/slices/authSlice";
const EduSparklePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuth());
  }, [dispatch]);

  if (user) {
    return <Navigate to="/u/dashboard" />;
  }

  return (
    <div className="edu-sparkle">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <Container className="hero-container">
          <Row className="align-items-center justify-content-center text-center">
            <Col md={10}>
              <div className="hero-content">
                <h1 className="display-4 fw-bold">منصة إديوسباركل</h1>
                <p className="lead mb-4">
                  منصة تعليمية متكاملة تربط بين المعلمين والطلاب وأولياء الأمور
                  والإدارة
                </p>
                <Button variant="primary" size="lg" className="ms-3">
                  <Link
                    to="auth/register"
                    className="text-white text-decoration-none"
                  >
                    سجّل الآن
                  </Link>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="about-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="about-img">
                <img
                  src="one.jpg"
                  alt="About EduSparkle"
                  className="img-fluid rounded-4 shadow"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-content text-end">
                <h2 className="section-title gradient-text mb-4">
                  عن منصة إديوسباركل
                </h2>
                <p className="section-description">
                  تُعد منصة إديوسباركل نظامًا تعليميًا متكاملًا يهدف إلى تحسين
                  العملية التعليمية من خلال ربط جميع أطرافها بطريقة سلسة وفعالة.
                  تم تصميم المنصة لتلبية احتياجات المؤسسات التعليمية بمختلف
                  أحجامها، مع التركيز على تحسين تجربة التعلم والتواصل بين
                  المعلمين والطلاب وأولياء الأمور والإدارة.
                </p>
                <p className="section-description">
                  باستخدام تقنيات حديثة وواجهة سهلة الاستخدام، توفر إديوسباركل
                  بيئة تعليمية تفاعلية تساعد على رفع كفاءة العملية التعليمية
                  وتحقيق نتائج أفضل للطلاب.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Platform Features Section */}
      <section id="features" className="features-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title gradient-text mb-4">
              كيف تعمل منصة إديوسباركل؟
            </h2>
            <p
              className="section-description mx-auto"
              style={{ maxWidth: "800px" }}
            >
              توفر منصة إديوسباركل تجربة مخصصة لكل مستخدم حسب دوره في العملية
              التعليمية. تعرف على المزايا والخدمات المتاحة لكل فئة من
              المستخدمين.
            </p>
          </div>

          <Row className="g-4">
            {/* Teachers Card */}
            <Col md={6} lg={3}>
              <Card className="role-card h-100 text-end">
                <div className="role-icon-container">
                  <i className="fas fa-chalkboard-teacher role-icon"></i>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold mb-3">المعلمون</Card.Title>
                  <Card.Text>
                    يمكن للمعلمين الاستفادة من مجموعة واسعة من الأدوات التي
                    تساعدهم على:
                  </Card.Text>
                  <ul className="features-list">
                    <li>إنشاء وتعديل وحذف المواد الدراسية بشكل كامل</li>
                    <li>إعداد الاختبارات والأسئلة التفاعلية للطلاب</li>
                    <li>إرسال الواجبات المنزلية وتصحيحها وتقييمها</li>
                    <li>تقديم ملاحظات وتغذية راجعة للطلاب بشكل فوري</li>
                    <li>متابعة تقدم الطلاب وتحليل أدائهم</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Admins Card */}
            <Col md={6} lg={3}>
              <Card className="role-card h-100 text-end">
                <div className="role-icon-container">
                  <i className="fas fa-user-shield role-icon"></i>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold mb-3">المديرون</Card.Title>
                  <Card.Text>
                    يتمتع المديرون بصلاحيات متقدمة تتيح لهم:
                  </Card.Text>
                  <ul className="features-list">
                    <li>تفعيل حسابات المعلمين بعد التسجيل</li>
                    <li>إدارة المستخدمين وتعيين الأدوار والصلاحيات</li>
                    <li>الإشراف الكامل على العملية التعليمية</li>
                    <li>الوصول إلى التقارير الإحصائية والتحليلية</li>
                    <li>إدارة المحتوى التعليمي والإعلانات على المنصة</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Parents Card */}
            <Col md={6} lg={3}>
              <Card className="role-card h-100 text-end">
                <div className="role-icon-container">
                  <i className="fas fa-user-friends role-icon"></i>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold mb-3">
                    أولياء الأمور
                  </Card.Title>
                  <Card.Text>
                    يمكن لأولياء الأمور متابعة أبنائهم عن كثب من خلال:
                  </Card.Text>
                  <ul className="features-list">
                    <li>تسجيل أبنائهم والربط بين حساباتهم</li>
                    <li>متابعة حضور وغياب الأبناء بشكل يومي</li>
                    <li>الاطلاع على درجات الاختبارات والتقييمات</li>
                    <li>استلام تقارير دورية وملاحظات من المعلمين</li>
                    <li>التواصل المباشر مع المعلمين والإدارة</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Students Card */}
            <Col md={6} lg={3}>
              <Card className="role-card h-100 text-end">
                <div className="role-icon-container">
                  <i className="fas fa-user-graduate role-icon"></i>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold mb-3">الطلاب</Card.Title>
                  <Card.Text>
                    يستفيد الطلاب من بيئة تعليمية تفاعلية تتيح لهم:
                  </Card.Text>
                  <ul className="features-list">
                    <li>الوصول إلى المواد الدراسية والمحتوى التعليمي</li>
                    <li>أداء الواجبات والاختبارات إلكترونيًا</li>
                    <li>استلام الملاحظات والتغذية الراجعة من المعلمين</li>
                    <li>متابعة التقدم الأكاديمي الشخصي</li>
                    <li>المشاركة في الأنشطة التفاعلية والتعلم التعاوني</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Platform Benefits */}
      <section className="benefits-section py-5">
        <Container>
          <Row>
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="benefits-content text-end">
                <h2 className="section-title gradient-text mb-4">
                  مميزات منصة إديوسباركل
                </h2>
                <p className="section-description">
                  تتميز منصة إديوسباركل بمجموعة من الخصائص التي تجعلها الخيار
                  الأمثل للمؤسسات التعليمية:
                </p>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-bolt"></i>
                    </div>
                    <div className="benefit-text">
                      <h4>سهولة الاستخدام</h4>
                      <p>
                        واجهة سلسة وبديهية تناسب جميع المستخدمين بمختلف
                        مستوياتهم التقنية
                      </p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-sync"></i>
                    </div>
                    <div className="benefit-text">
                      <h4>تواصل مستمر</h4>
                      <p>
                        قنوات تواصل فعالة بين جميع أطراف العملية التعليمية بشكل
                        فوري ومباشر
                      </p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="benefit-text">
                      <h4>تحليل دقيق للأداء</h4>
                      <p>
                        تقارير وإحصائيات تفصيلية تساعد على تطوير العملية
                        التعليمية
                      </p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <div className="benefit-text">
                      <h4>أمان وخصوصية</h4>
                      <p>حماية قصوى لبيانات المستخدمين والمحتوى التعليمي</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="benefits-img">
                <img
                  src="two.jpg"
                  alt="EduSparkle Benefits"
                  className="img-fluid rounded-4 shadow"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Footer */}
      <footer className="footer-section py-4">
        <Container>
          <div className="text-center text-white">
            <p>جميع الحقوق محفوظة &copy; 2025 - منصة إديوسباركل</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default EduSparklePage;
