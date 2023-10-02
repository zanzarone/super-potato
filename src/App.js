import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutA from "./components/LayoutA";
import useTitle from "./hooks/useTitle";
import ProductsPage from "./features/products/ProductsPage";
import EditProductPage from "./features/products/EditProductPage";
import LayoutB from "./components/LayoutB";
import AddProductPage from "./features/products/AddProductPage";
import LoginPage from "./features/auth/LoginPage";
import PersistLogin from "./features/auth/PersistLogin";
import WelcomePage from "./features/board/WelcomePage";
import LayoutC from "./components/LayoutC";
import UserProfile from "./features/board/UserProfile";

function App() {
  useTitle("Frontend");

  return (
    <Routes>
      <Route path="/" element={<LayoutA />}>
        {/* //# public routes */}
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* //# */}
        <Route path="products" element={<LayoutB />}>
          <Route index element={<ProductsPage />} />
          <Route path=":productId" element={<EditProductPage />} />
          <Route path="add" element={<AddProductPage />} />
        </Route>
        {/* //# Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route path="board" element={<LayoutC />}>
            <Route index element={<UserProfile />} />
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
