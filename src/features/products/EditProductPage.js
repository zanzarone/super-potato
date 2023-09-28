import React from "react";
import { useGetProductsQuery, useUpdateProductMutation } from "./productsSlice";
import { useParams } from "react-router-dom";
import ProductHeader from "./ProductHeader";
import Product from "./Product";
import style from "../../assets/styles/Products.module.scss";

const EditProductPage = () => {
  const { productId } = useParams();
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
        id: product.id,
        _id: product._id,
        createdAt: product.createdAt,
        security: product.security,
      }).unwrap();
    } catch (err) {
      console.log("sssoooka", err);
      return { error: err };
    }
    return null;
  };

  if (isLoadingProducts) return <p>Loading...</p>;

  if (isSuccess)
    return (
      <>
        <ProductHeader />
        <div className={`responsiveWrapper ${style.content}`}>
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
            clearDataOnLeave={false}
          />
        </div>
      </>
    );

  return <div>{productId}</div>;
};

export default EditProductPage;
