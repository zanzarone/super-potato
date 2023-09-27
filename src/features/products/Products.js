import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { selectAllProducts, useGetProductsQuery } from "./productsSlice";
import { useSelector } from "react-redux";
import { compareAsc, parseISO } from "date-fns";
import style from "./Products.module.scss";
import {
  MagnifyingGlass,
  Plus,
  Binoculars,
  Pencil,
} from "@phosphor-icons/react";
import PublicHeader from "../../components/PublicHeader";
import SubHeader from "../../components/SubHeader";
import ProductList from "./ProductList";
import useTitle from "../../hooks/useTitle";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";

const TabIds = { Tab0: "tab0", Tab1: "tab1", Tab2: "tab2" };

const SearchBar = ({ products, setSearchResult }) => {
  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResult(products);
    const resultsArray = products.filter((product) =>
      product.name.includes(e.target.value)
    );
    setSearchResult(resultsArray);
  };
  return (
    <div className="formInput">
      <input
        type="text"
        placeholder="Search by name"
        onChange={handleSearchChange}
      />
      <button type="submit">
        <MagnifyingGlass />
      </button>
    </div>
  );
};

const Products = () => {
  useTitle("Product List");

  const [tab, setTab] = useState(TabIds.Tab0);
  const [prods, setProds] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentProdId, setCurrentProdId] = useState();

  const products = useSelector(selectAllProducts)?.sort((a, b) => {
    if (!b?.updatedAt || !a?.updatedAt) return 0;
    const aDate = parseISO(a.updatedAt);
    const bDate = parseISO(b.updatedAt);
    console.log(aDate, bDate);
    return compareAsc(bDate, aDate);
  });

  const { isLoading, isSuccess, isError, error } = useGetProductsQuery();

  useEffect(() => {
    setProds(products);
    setSearchResults(products);
  }, [products]);

  const handleChangeTab = (e) => {
    console.log(e);
    if (e?.target?.id) {
      setTab(e?.target?.id);
    }
  };

  const handleOnAddProductFinished = () => setTab(TabIds.Tab0);
  const handleOnUpdateProductFinished = () => {
    setCurrentProdId(undefined);
    setTab(TabIds.Tab0);
  };
  const handleOnEditClicked = ({ productId }) => {
    setCurrentProdId(productId);
    setTab(TabIds.Tab2);
  };
  const handleOnDeleteClicked = () => {};

  let content;
  if (isLoading) {
    return <p>"Loading..."</p>;
  }
  if (isError) {
    return <p>{error}</p>;
  }

  let page = null;
  switch (tab) {
    case TabIds.Tab0:
      page = (
        <ProductList
          searchResults={searchResults}
          onEditClicked={handleOnEditClicked}
          onDeleteClicked={handleOnDeleteClicked}
        />
      );
      break;
    case TabIds.Tab1:
      page = <AddProduct onFinished={handleOnAddProductFinished} />;
      break;
    case TabIds.Tab2:
      page = (
        <UpdateProduct
          onFinished={handleOnUpdateProductFinished}
          productId={currentProdId}
        />
      );
      break;
  }
  if (isSuccess) {
    return (
      <main className={style.main}>
        <PublicHeader />
        <SubHeader title="Products">
          {tab === TabIds.Tab0 && (
            <SearchBar products={prods} setSearchResult={setSearchResults} />
          )}
        </SubHeader>
        <div className={`responsiveWrapper ${style.content}`}>
          <div className="content-panel">
            <div className="vertical-tabs">
              <span
                id={TabIds.Tab0}
                className={`tab ${tab === TabIds.Tab0 ? "active" : ""}`}
                onClick={handleChangeTab}
              >
                <Binoculars size={20} /> View all
              </span>
              <span
                id={TabIds.Tab1}
                className={`tab ${tab === TabIds.Tab1 ? "active" : ""}`}
                onClick={handleChangeTab}
              >
                <Plus size={20} /> Add product
              </span>
              {currentProdId && (
                <span
                  id={TabIds.Tab2}
                  className={`tab ${tab === TabIds.Tab2 ? "active" : ""}`}
                  onClick={handleChangeTab}
                >
                  <Pencil size={20} /> Edit product
                </span>
              )}
            </div>
          </div>
          {page}
        </div>
      </main>
    );
  }

  return content;
};

export default Products;
