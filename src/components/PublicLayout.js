import React from "react";
import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";

const PublicLayout = () => {
  return (
    <main className="main">
      <PublicHeader />
      <Outlet />
    </main>
  );
};

export default PublicLayout;