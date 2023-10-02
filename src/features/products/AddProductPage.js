import React from "react";
import { useAddNewProductMutation } from "./productsSlice";
import Product from "./Product";
import { Binoculars, Plus } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import style from "../../assets/styles/Products.module.scss";
import SectionHeader from "../../components/SectionHeader";

const AddProductPage = () => {
  const [addNewProduct, { isLoading }] = useAddNewProductMutation();
  const pathname = useLocation().pathname;

  const handleOnAdd = async ({
    name,
    value,
    status,
    description,
    storeId,
    platform,
  }) => {
    try {
      await addNewProduct({
        name,
        value,
        status,
        description,
        store: storeId,
        platforms: [platform],
      }).unwrap();
    } catch (err) {
      return { error: err.message };
    }
    return null;
  };

  return (
    <>
      <SectionHeader
        title="Products"
        navigationComponents={
          <>
            <Link
              to={"/products"}
              className={`item ${pathname === "/products" ? "active" : ""}`}
            >
              <Binoculars size={20} />
              View all
            </Link>
            <Link
              to={"/products/add"}
              className={`item ${pathname === "/products/add" ? "active" : ""}`}
            >
              <Plus size={20} />
              Add product
            </Link>
          </>
        }
      />
      <div className={`responsiveWrapper ${style.content}`}>
        <Product
          title="Add new product"
          isLoading={isLoading}
          onAdd={handleOnAdd}
        />
      </div>
    </>
  );
};

export default AddProductPage;
