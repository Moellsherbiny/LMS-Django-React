import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "../components/StudentNav";
import { ProtectedRoute } from "../routes/Route";
const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ProtectedRoute>
      <Navbar toggleSidebar={toggleSidebar} />
      <Container fluid className="py-4">
        <Outlet />
      </Container>
    </ProtectedRoute>
  );
};

export default MainLayout;
