import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import useTitle from "./hooks/useTitle";
import ProductsPage from "./features/products/ProductsPage";
import EditProductPage from "./features/products/EditProductPage";
import PublicLayout from "./components/PublicLayout";
import AddProductPage from "./features/products/AddProductPage";
import LoginPage from "./features/auth/LoginPage";
import PersistLogin from "./features/auth/PersistLogin";
import BoardLayout from "./features/board/BoardLayout";
import BoardPage from "./features/board/BoardPage";

function App() {
  useTitle("Frontend");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* //# public routes */}
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* //# */}
        <Route path="products" element={<PublicLayout />}>
          <Route index element={<ProductsPage />} />
          <Route path=":productId" element={<EditProductPage />} />
          <Route path="add" element={<AddProductPage />} />
        </Route>
        {/* //# Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route path="board" element={<BoardLayout />}>
            <Route index element={<BoardPage />} />
          </Route>
        </Route>
        {/* <Route element={<PersistLogin />}> */}
        {/* <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          > */}
        {/* <Route element={<Prefetch />}> */}
        {/* <Route path="dash" element={<DashLayout />}>
            <Route index element={<Welcome />} />
          </Route> */}
        {/* </Route>
          </Route> */}
      </Route>

      {/* <Route path="users" element={<PublicLayout />}></Route> */}
      {/* </Route> */}
    </Routes>
  );
}

export default App;
