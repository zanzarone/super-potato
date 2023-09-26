import React, { useState } from "react";
import {
    selectAllProducts,
    selectProductIds,
    useGetProductsQuery,
} from "./productsSlice";
import { useSelector } from "react-redux";
import style from "./ProductList.module.scss";
import {
    MagnifyingGlass,
    Horse,
    Plus,
    Binoculars,
    Trash,
    PencilSimpleLine,
    AndroidLogo,
} from "@phosphor-icons/react";
import logo from "../../assets/img/logo.png";

const ProductList = () => {
    const productsIds = useSelector(selectAllProducts);

    const { isLoading, isSuccess, isError, error } = useGetProductsQuery();

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = (
            <main className={style.main}>
                <header>
                    <div
                        className={`${style.responsiveWrapper} ${style.headerContent}`}
                    >
                        <img src={logo} />
                        <span className={style.logoName}>Frontend</span>
                    </div>
                </header>
                <div className={style.responsiveWrapper}>
                    <div className={style.subHeader}>
                        <h2>Products</h2>
                        <div className={style.search}>
                            <input type="text" placeholder="Search" />
                            <button type="submit">
                                <MagnifyingGlass />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${style.responsiveWrapper} ${style.content}`}>
                    <div
                        className="content-panel"
                        style={{
                            // backgroundColor: "lightcyan",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <div className="vertical-tabs">
                            <a
                                href="#"
                                className="active"
                                style={{
                                    // backgroundColor: "pink",
                                    gap: "0.3rem",
                                }}
                            >
                                <Binoculars /> View all
                            </a>
                            <a
                                href="#"
                                style={{
                                    // backgroundColor: "pink",
                                    gap: "0.3rem",
                                }}
                            >
                                <Plus /> Add product
                            </a>
                        </div>
                    </div>
                    <div className="card-grid">
                        {productsIds.map((p) => {
                            return (
                                <article className="card">
                                    <div className="card-header">
                                        <div>
                                            <span>
                                                <AndroidLogo size={32} />
                                            </span>
                                            <h3>{p?.name}</h3>
                                        </div>
                                        {/* <label className="toggle">
                                            <input type="checkbox" checked />
                                            <span></span>
                                        </label> */}
                                    </div>
                                    <div className="card-body">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontSize: "small",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Descr:
                                                </td>
                                                <td
                                                    style={{
                                                        fontSize: "small",
                                                    }}
                                                >
                                                    {p?.description}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontSize: "small",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Value:
                                                </td>
                                                <td
                                                    style={{
                                                        fontSize: "small",
                                                    }}
                                                >
                                                    {p?.value}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontSize: "small",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Created:
                                                </td>
                                                <td
                                                    style={{
                                                        fontSize: "small",
                                                    }}
                                                >
                                                    {p?.createdAt}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontSize: "small",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Updated:
                                                </td>
                                                <td
                                                    style={{
                                                        fontSize: "small",
                                                    }}
                                                >
                                                    {p?.updatedAt}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </div>
                                    <div className="card-footer">
                                        <a href="#" className="icon-button">
                                            <Trash size={22} color="crimson" />
                                        </a>
                                        <a href="#" className="icon-button">
                                            <PencilSimpleLine
                                                size={22}
                                                color="royalBlue"
                                            />
                                        </a>
                                    </div>
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
