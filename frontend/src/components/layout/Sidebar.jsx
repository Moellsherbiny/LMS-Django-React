import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = ({ isOpen }) => {
  const { user } = useSelector(state => state.auth);
  
  const roleBasedMenuItems = () => {
    switch(user?.role) {
      case 'admin':
        return (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/users">
                <i className="fas fa-users me-2"></i> المستخدمين
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/settings">
                <i className="fas fa-cog me-2"></i> الإعدادات
              </NavLink>
            </li>
          </>
        );
      case 'teacher':
        return (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/courses/create">
                <i className="fas fa-plus-circle me-2"></i> إنشاء مقرر
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/assignments/manage">
                <i className="fas fa-tasks me-2"></i> إدارة الواجبات
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/quizzes/manage">
                <i className="fas fa-question-circle me-2"></i> إدارة الاختبارات
              </NavLink>
            </li>
          </>
        );
      case 'parent':
        return (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/children">
                <i className="fas fa-child me-2"></i> الأبناء
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/reports">
                <i className="fas fa-chart-line me-2"></i> التقارير
              </NavLink>
            </li>
          </>
        );
      default: // Student
        return (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/grades">
                <i className="fas fa-chart-bar me-2"></i> الدرجات
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/calendar">
                <i className="fas fa-calendar-alt me-2"></i> التقويم
              </NavLink>
            </li>
          </>
        );
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard">
              <i className="fas fa-tachometer-alt me-2"></i> لوحة التحكم
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/courses">
              <i className="fas fa-book me-2"></i> المقررات
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/assignments">
              <i className="fas fa-file-alt me-2"></i> الواجبات
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/quizzes">
              <i className="fas fa-question me-2"></i> الاختبارات
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/messages">
              <i className="fas fa-envelope me-2"></i> الرسائل
            </NavLink>
          </li>
          
          {roleBasedMenuItems()}
          
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              <i className="fas fa-user me-2"></i> الملف الشخصي
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;