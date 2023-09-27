import React from "react";
import { useAddNewProductMutation } from "./productsSlice";
import Product from "./Product";

const AddProduct = ({ onFinished }) => {
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
        storeId,
        platforms: [platform],
      }).unwrap();
    } catch (err) {
      return { error: err.message };
    }
    return null;
  };

  const handleOnCanceled = () => {
    onFinished();
  };
  const handleOnFinished = () => {
    onFinished();
  };

  return (
    <Product
      title="Add new product"
      isLoading={isLoading}
      onAdd={handleOnAdd}
      onFinished={handleOnFinished}
      onCanceled={handleOnCanceled}
    />
  );
};

export default AddProduct;
