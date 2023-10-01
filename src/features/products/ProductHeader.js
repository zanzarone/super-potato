import React from "react";
import { Binoculars, Plus } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import style from "../../assets/styles/SectionHeader.module.scss";

const ProductHeader = ({ rightBarComponents }) => {
  const pathname = useLocation().pathname;

  return (
    <div className="responsiveWrapper">
      <div className={style.first}>
        <div className={style.a}>
          <h2>Products</h2>
          {rightBarComponents}
        </div>
        <div className={style.a}>
          <div className="horizontal-tabs">
            <Link
              to={"/products"}
              className={`item ${pathname === "/products" ? "active" : ""}`}
            >
              <Binoculars size={20} />
              View all
            </Link>
            <Link
              to={"/products/add"}
              className={`item ${pathname === "/products/add" ? "active" : ""}`}
            >
              <Plus size={20} />
              Add product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
