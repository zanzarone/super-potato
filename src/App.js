import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./components/Login";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("Pippo");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Login />} />
        <Route index element={<Public />} />
      </Route>
    </Routes>
  );
}

export default App;
