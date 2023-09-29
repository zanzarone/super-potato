import React from "react";
import style from "../assets/styles/PublicHeader.module.scss";
import logo from "../assets/img/logo.png";

const PublicHeader = ({ elements = null }) => {
  return (
    <header>
      <div className={`responsiveWrapper ${style.headerContent}`}>
        <img src={logo} />
        <span className={style.logoName}>Frontend</span>
      </div>
      {elements}
    </header>
  );
};

export default PublicHeader;
