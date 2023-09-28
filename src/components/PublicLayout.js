import React from "react";
import { Outlet } from "react-router-dom";
import style from "../assets/styles/Products.module.scss";
import PublicHeader from "./PublicHeader";

const PublicLayout = () => {
  return (
    <main className={style.main}>
      <PublicHeader />
      <Outlet />
    </main>
  );
};

export default PublicLayout;
