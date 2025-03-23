import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/master.css";

import { fetchDashboardData } from "../redux/slices/dashboardSlice";
import {
  Container,
  Row,
  Col,
  Card,
  Tabs,
  Tab,
  Badge,
  ListGroup,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, courses, assignments, quizzes, status, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Example data for chart - you would replace this with actual data
  const chartData = [
    { name: "يناير", courses: 4, assignments: 7, quizzes: 2 },
    { name: "فبراير", courses: 3, assignments: 5, quizzes: 3 },
    { name: "مارس", courses: 5, assignments: 8, quizzes: 4 },
    { name: "أبريل", courses: 6, assignments: 4, quizzes: 2 },
    { name: "مايو", courses: 4, assignments: 6, quizzes: 5 },
    { name: "يونيو", courses: 7, assignments: 9, quizzes: 3 },
  ];

  // Activity summary data
  const activityData = [
    { name: "الدورات", count: courses?.length || 0, color: "#8884d8" },
    { name: "التكاليف", count: assignments?.length || 0, color: "#82ca9d" },
    { name: "الاختبارات", count: quizzes?.length || 0, color: "#ffc658" },
  ];

  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>حدث خطأ</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              variant="outline-danger"
              onClick={() => dispatch(fetchDashboardData())}
            >
              إعادة المحاولة
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-EG");
  };

  return (
    <div dir="rtl">
      {/* Header with gradient background */}
      <div className="bg-primary bg-gradient rounded text-white py-4 mb-4">
        <Container>
          <h1 className="display-5 fw-bold">لوحة التحكم</h1>
          {user && (
            <p className="lead mb-0">
              مرحبًا، {user.first_name} {user.last_name}
            </p>
          )}
        </Container>
      </div>

      <Container>
        {/* Charts Section */}
        <Card className="shadow-sm mb-4">
          <Card.Header as="h5" className="bg-white">
            نظرة عامة على النشاط
          </Card.Header>
          <Card.Body>
            <Row>
              {/* Activity Chart */}
              <Col lg={8} md={7} className="mb-4 mb-md-0">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ direction: "rtl" }} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="courses"
                      name="الدورات"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Area
                      type="monotone"
                      dataKey="assignments"
                      name="التكاليف"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                    <Area
                      type="monotone"
                      dataKey="quizzes"
                      name="الاختبارات"
                      stackId="1"
                      stroke="#ffc658"
                      fill="#ffc658"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Col>

              {/* Summary Bar Chart */}
              <Col lg={4} md={5}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={activityData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip contentStyle={{ direction: "rtl" }} />
                    <Bar
                      dataKey="count"
                      name="العدد"
                      fill="#8884d8"
                      barSize={30}
                    >
                      {activityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* User Info Card */}
        {user && (
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Row className="align-items-center">
                <Col md="auto" className="mb-3 mb-md-0">
                  <div
                    className="bg-primary bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "80px", height: "80px", fontSize: "2rem" }}
                  >
                    {user.first_name[0]}
                    {user.last_name[0]}
                  </div>
                </Col>
                <Col>
                  <h2 className="h3 mb-2">
                    {user.first_name} {user.last_name}
                  </h2>
                  <div className="d-flex flex-wrap gap-2 align-items-center">
                    <Badge bg="primary" className="fs-6 py-2 px-3">
                      {user.role}
                    </Badge>
                    <span className="text-muted">{user.email}</span>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Tabs defaultActiveKey="courses" className="mb-3" justify>
              {/* Courses Tab */}
              <Tab eventKey="courses" title={`الدورات (${courses.length})`}>
                {courses.length > 0 ? (
                  <ListGroup variant="flush">
                    {courses.map((course) => (
                      <ListGroup.Item
                        key={course.id}
                        className="d-flex justify-content-between align-items-start py-3"
                      >
                        <div>
                          <h5 className="mb-1">{course.title}</h5>
                          <p className="text-muted mb-0">
                            المدرس: {course.teacher_name}
                          </p>
                        </div>
                        <Badge bg="primary" pill>
                          <i className="bi bi-book me-1"></i>
                        </Badge>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <Alert variant="light" className="text-center">
                    لا توجد دورات حالية
                  </Alert>
                )}
              </Tab>

              {/* Assignments Tab */}
              <Tab
                eventKey="assignments"
                title={`التكاليف (${assignments.length})`}
              >
                {assignments.length > 0 ? (
                  <ListGroup variant="flush">
                    {assignments.map((assignment) => (
                      <ListGroup.Item
                        key={assignment.id}
                        className="d-flex justify-content-between align-items-start py-3"
                      >
                        <div>
                          <h5 className="mb-1">{assignment.title}</h5>
                          <div className="d-flex align-items-center">
                            <small className="text-muted">تاريخ التسليم:</small>
                            <Badge bg="warning" text="dark" className="ms-2">
                              {formatDate(assignment.due_date)}
                            </Badge>
                          </div>
                        </div>
                        <Badge bg="success" pill>
                          <i className="bi bi-file-earmark-text me-1"></i>
                        </Badge>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <Alert variant="light" className="text-center">
                    لا توجد تكاليف حالية
                  </Alert>
                )}
              </Tab>

              {/* Quizzes Tab */}
              <Tab eventKey="quizzes" title={`الاختبارات (${quizzes.length})`}>
                {quizzes.length > 0 ? (
                  <ListGroup variant="flush">
                    {quizzes.map((quiz) => (
                      <ListGroup.Item
                        key={quiz.id}
                        className="d-flex justify-content-between align-items-start py-3"
                      >
                        <div>
                          <h5 className="mb-1">{quiz.title}</h5>
                          <p className="text-muted mb-0">
                            المدرس: {quiz.teacher_name}
                          </p>
                        </div>
                        <Badge bg="danger" pill>
                          <i className="bi bi-question-circle me-1"></i>
                        </Badge>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <Alert variant="light" className="text-center">
                    لا توجد اختبارات حالية
                  </Alert>
                )}
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;
