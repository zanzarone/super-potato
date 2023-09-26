import React, { useState } from "react";
import {
  selectAllProducts,
  selectProductIds,
  useGetProductsQuery,
} from "./productsSlice";
import { useSelector } from "react-redux";
import style from "./ProductList.module.scss";
import logo from "../../assets/img/logo.png";

const ProductList = () => {
  const productsIds = useSelector(selectAllProducts);

  const [title, setTitle] = useState("");

  const onTitleChanged = (e) => setTitle(e.target.value);

  const { isLoading, isSuccess, isError, error } = useGetProductsQuery();

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = (
      <main className={style.main}>
        <header>
          <div className={style.responsiveWrapper}>
            <img src={logo} /> <span className={style.logoName}>Frontend</span>
          </div>
        </header>
        {/* <div className={style.content}> */}
        <div className={style.responsiveWrapper}>
          <div className={style.subHeader}>
            <h2>Products</h2>
            <div className={style.search}>
              <input type="text" placeholder="Search" />
              <button type="submit">
                <i class="ph-magnifying-glass-bold"></i>
              </button>
            </div>
          </div>
        </div>
        {/* <div className={style.responsiveWrapper}> */}
        <div
          style={{ display: "flex", paddingTop: "2rem", paddingBottom: "2rem" }}
        >
          <div className="content-panel">
            <div className="vertical-tabs">
              <a href="#" class="active">
                View all
              </a>
              <a href="#">Developer tools</a>
              {/* <a href="#">Communication</a>
              <a href="#">Productivity</a>
              <a href="#">Browser tools</a>
              <a href="#">Marketplace</a> */}
            </div>
          </div>
          <div class="card-grid">
            {productsIds.map((p) => {
              return (
                <article class="card">
                  <div class="card-header">
                    <div>
                      <span>
                        <img src="https://assets.codepen.io/285131/zeplin.svg" />
                      </span>
                      <h3>{p?.name}</h3>
                    </div>
                    <label class="toggle">
                      <input type="checkbox" checked />
                      <span></span>
                    </label>
                  </div>
                  <div class="card-body">
                    <tbody>
                      <tr>
                        <td style={{ fontSize: "small" }}>Descr:</td>
                        <td style={{ fontSize: "small" }}>{p?.description}</td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: "small" }}>Value:</td>
                        <td style={{ fontSize: "small" }}>{p?.value}</td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: "small" }}>Created:</td>
                        <td style={{ fontSize: "small" }}>{p?.createdAt}</td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: "small" }}>Updated:</td>
                        <td style={{ fontSize: "small" }}>{p?.updatedAt}</td>
                      </tr>
                    </tbody>
                    {/* <p>{p?.description}</p> */}
                  </div>
                  {/* <p>Value:{p?.value}</p> */}
                </article>
              );
            })}
            {/* </div> */}
          </div>
        </div>
      </main>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return content;
};

export default ProductList;
