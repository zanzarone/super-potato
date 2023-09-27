import React from "react";
import style from "./PublicHeader.module.scss";
import logo from "../assets/img/logo.png";

const PublicHeader = () => {
  return (
    <header>
      <div className={`responsiveWrapper ${style.headerContent}`}>
        <img src={logo} />
        <span className={style.logoName}>Frontend</span>
      </div>
    </header>
  );
};

export default PublicHeader;
