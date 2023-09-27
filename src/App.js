import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import useTitle from "./hooks/useTitle";
import Products from "./features/products/Products";

function App() {
  useTitle("Frontend");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* //# public routes */}
        <Route path="products">
          <Route index element={<Products />} />
          {/* <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

{
  /* <Route element={<Login />} /> */
}
