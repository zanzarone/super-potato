import React from "react";

// import { Link, useLocation } from "react-router-dom";
import style from "../assets/styles/SectionHeader.module.scss";

const SectionHeader = ({ title = "", rightBarComponents, navigationComponents }) => {
//   const pathname = useLocation().pathname;

  return (
    <div className="responsiveWrapper">
      <div className={style.first}>
        <div className={style.a}>
          <h2>{title}</h2>
          {rightBarComponents}
        </div>
        <div className={style.a}>
          <div className="horizontal-tabs">
            {navigationComponents}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
