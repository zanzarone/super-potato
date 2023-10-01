import React from "react";
import { useLocation } from "react-router-dom";
import style from "../assets/styles/PublicHeader.module.scss";
import logo from "../assets/img/logo.png";

const Header = ({}) => {
    const location = useLocation().pathname;
    const elements = <p>{location}</p>;
    return (
        <header>
            <div className={`responsiveWrapper ${style.headerContent}`}>
                <div className={style.logoContent}>
                    <img src={logo} />
                    <span className={style.logoName}>Frontend</span>
                </div>
                {elements}
            </div>
        </header>
    );
};

export default Header;
