import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
//# CHILDREN con HEADER
const LayoutB = ({ elements }) => {
    return (
        <main>
            <Header elements={elements} />
            <Outlet />
        </main>
    );
};

export default LayoutB;
