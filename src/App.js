import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import useTitle from "./hooks/useTitle";
import ProductsPage from "./features/products/ProductsPage";
import EditProductPage from "./features/products/EditProductPage";
import PublicLayout from "./components/PublicLayout";
import AddProductPage from "./features/products/AddProductPage";

function App() {
  useTitle("Frontend");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* //# public routes */}
        <Route path="products" element={<PublicLayout />}>
          <Route index element={<ProductsPage />} />
          <Route path=":productId" element={<EditProductPage />} />
          <Route path="add" element={<AddProductPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
