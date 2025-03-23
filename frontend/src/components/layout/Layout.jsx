import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header toggleSidebar={toggleSidebar} />
      <div className="container-fluid">
        <div className="row">
          <Sidebar isOpen={sidebarOpen} />
          <main className={`col-md-${sidebarOpen ? '9' : '12'} col-lg-${sidebarOpen ? '10' : '12'} ms-sm-auto px-md-4 py-4`}>
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;