import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar";

import WelcomePage from "./WelcomePage";

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <WelcomePage />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
