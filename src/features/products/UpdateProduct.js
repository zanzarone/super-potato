import React from "react";
import { useGetProductsQuery, useUpdateProductMutation } from "./productsSlice";
import { useParams } from "react-router-dom";
import Product from "./Product";

const UpdateProduct = ({ onFinished, productId }) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const {
    product,
    isLoading: isLoadingProducts,
    isSuccess,
  } = useGetProductsQuery("getProducts", {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      product: data?.entities[productId],
      isLoading,
      isSuccess,
    }),
  });

  const handleOnCanceled = () => {
    onFinished();
  };
  const handleOnFinished = () => {
    onFinished();
  };

  const handleOnAdd = async ({
    name,
    value,
    status,
    description,
    storeId,
    platform,
  }) => {
    try {
      await updateProduct({
        name,
        value,
        status,
        description,
        storeId,
        platforms: [platform],
        //
        id: productId,
        _id: product._id,
        createdAt: product.createdAt,
        security: product.security,
      }).unwrap();
    } catch (err) {
      return { error: err.message };
    }
    return null;
  };

  if (isLoadingProducts) return <p>Loading...</p>;

  if (isSuccess)
    return (
      <Product
        title={`Update product`}
        isLoading={isLoading}
        initName={product.name}
        initDescr={product.description}
        initPlatform={product.platforms[0]}
        initStatus={product.status}
        initStoreId={product.store}
        initValue={product.value}
        onAdd={handleOnAdd}
        onFinished={handleOnFinished}
        onCanceled={handleOnCanceled}
        clearDataOnLeave={false}
      />
    );

  return <div>{productId}</div>;
};

export default UpdateProduct;
