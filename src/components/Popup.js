import React from "react";
import style from "../assets/styles/Popup.module.scss";
import { Warning, Info, CheckFat } from "@phosphor-icons/react";
// red FA5252
// green 32CD32
const Popup = ({
    title = "",
    message = "",
    classType = "infoBg",
    type = "absolute",
}) => {
    let icon = <Info size={18} />;
    if (classType === "successBg") {
        icon = <CheckFat size={18} />;
    } else if (classType === "dangerBg") {
        icon = <Warning size={18} />;
    } else if (classType === "infoBg") {
    }
    let content = (
        <div className={`${style.inner}`}>
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".3rem",
                }}
            >
                {icon}
                <span style={{ fontSize: 12, fontWeight: "bold" }}>
                    {title}
                </span>
            </span>
            <span style={{ fontSize: 12, fontWeight: "medium" }}>
                {message}
            </span>
        </div>
    );

    if (type === "absolute")
        return (
            <div style={{ position: "relative", width: "100%" }}>
                <div className={`${style.content} ${classType}`}>{content}</div>
            </div>
        );
    else
        return (
            <div className={`${style.contentFixed} ${classType}`}>
                {content}
            </div>
        );
};

export default Popup;
