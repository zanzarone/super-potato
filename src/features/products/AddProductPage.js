import React from "react";
import { useAddNewProductMutation } from "./productsSlice";
import Product from "./Product";
import ProductHeader from "./ProductHeader";
import style from "../../assets/styles/Products.module.scss";

const AddProductPage = () => {
  const [addNewProduct, { isLoading }] = useAddNewProductMutation();

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
      <ProductHeader />
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
