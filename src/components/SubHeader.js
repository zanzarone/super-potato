import React from "react";
import style from "./SubHeader.module.scss";
const SubHeader = ({ title, children }) => {
  return (
    <div className="responsiveWrapper">
      <div className={style.subHeader}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default SubHeader;
