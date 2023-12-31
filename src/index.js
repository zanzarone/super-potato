import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/global.scss";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { productsApiSlice } from "./features/products/productsSlice";
//?
store.dispatch(productsApiSlice.endpoints.getProducts.initiate());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
