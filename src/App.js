import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
// import Login from "./components/Login";
import useTitle from "./hooks/useTitle";
import ProductList from "./features/products/ProductList";

function App() {
  useTitle("Frontend");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* //# public routes */}
        <Route index element={<ProductList />} />
        <Route path="products"></Route>
      </Route>
    </Routes>
  );
}

export default App;

{
  /* <Route element={<Login />} /> */
}
