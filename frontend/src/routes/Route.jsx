import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { isAuth, logoutAsync } from "../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

// الصفحات
import LandingPage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AuthLayout from "../components/AuthLayout";
import Courses from "../pages/Courses";
import MainLayout from "../components/MainLayout";
import CourseDetail from "../components/Courses/CourseDetails";
import Assignments from "../pages/Assignments";
import AssignmentDetail from "../components/assignment/AssignmentDetail";
import Quizzes from "../pages/Quizzes";
import Feedback from "../pages/FeebackPage";
import QuizResults from "../pages/QuizResults";
// المكون الخاص بحماية المسارات
import { Spinner } from "react-bootstrap";
import MyCourses from "../pages/MyCoursesPage";
import CourseViewPage from "../pages/CourseViewPage";
import NotFound from "../pages/NotFound";
export const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(isAuth());
  }, [dispatch]);

  // عرض سبينر أثناء تحميل بيانات المستخدم
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // إعادة التوجيه إذا لم يكن المستخدم مسجل الدخول
  if (!user)
    return <Navigate to="/" replace />;
  
  if(user && user.message) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="text-center text-primary">مرحبا {user.user.first_name} {user.user.last_name}</h1>
        <p className="text-center text-primary">{user.message}</p>
        <Button variant="primary" onClick={() => dispatch(logoutAsync())}>تسجيل الخروج</Button>
      </div>
    );
  }
  
  return <main>{children}</main>;
};
const Activate = () => {
  return (
    <div>
      <h1>Activate</h1>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* المسارات العامة */}
      <Route index element={<LandingPage />} />
      <Route path="/activate" element={<Activate />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/auth/*" element={<AuthLayout />}>
        <Route index path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      
      <Route path="/u/*" element={<MainLayout />}>
        <Route path="dashboard" index element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="mycourses" element={<MyCourses />} />
        <Route path="course/:id" element={<CourseDetail />} />
        <Route path="mycourse/:id" element={<CourseViewPage />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="assignment/:id" element={<AssignmentDetail />} />
        <Route path="quizzes" element={<Quizzes />} />
        <Route path="quizzes/results" element={<QuizResults />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
