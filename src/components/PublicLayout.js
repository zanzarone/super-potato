import React from "react";
import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";

const PublicLayout = ({ elements }) => {
  return (
    <main className="main">
      <PublicHeader elements={elements} />
      <Outlet />
    </main>
  );
};

export default PublicLayout;
