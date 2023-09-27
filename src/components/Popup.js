import React from "react";
// red FA5252
// green 32CD32
const Popup = ({ title = "", message = "", color }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        minWidth: 200,
        // minHeight: 150,
        borderRadius: 8,
        backgroundColor: "#32CD32",
        display: "flex",
        //   padding: "0 .5rem",
      }}
    >
      <div
        style={{
          margin: ".5rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ color: "snow" }}>{title}</span>
        <small style={{ color: "snow" }}>{message}</small>
      </div>
    </div>
  );
};

export default Popup;
