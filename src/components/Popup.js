import React from "react";
import style from "./Popup.module.scss";
import { Warning, Info, CheckFat } from "@phosphor-icons/react";
// red FA5252
// green 32CD32
const Popup = ({ title = "", message = "", classType = "success" }) => {
    let className = style.info;
    let icon = <Info size={18} />;
    if (classType === "success") {
        icon = <CheckFat size={18} />;
        className = style.success;
    } else if (classType === "danger") {
        icon = <Warning size={18} />;
        className = style.danger;
    } else if (classType === "info") {
        className = style.info;
    }
    return (
        <div className={`${style.content} ${className}`}>
            <div className={`${style.inner}`}>
                <span
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".3rem",
                    }}
                >
                    {icon}
                    {title}
                </span>
                <small>{message}</small>
            </div>
        </div>
    );
};

export default Popup;
