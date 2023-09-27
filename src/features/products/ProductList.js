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
    AppleLogo,
    CheckCircle,
    WarningCircle,
    Question,
    WindowsLogo,
    PauseCircle,
} from "@phosphor-icons/react";
import logo from "../../assets/img/logo.png";

const getOSLogo = (oss) => {
    console.log(oss);
    if (oss?.some((os) => os === "Android")) {
        return <AndroidLogo size={32} color="limegreen" />;
    } else if (oss?.some((os) => os === "iOS")) {
        return <AppleLogo size={32} color="royalBlue" />;
    } else if (oss?.some((os) => os === "Windows")) {
        return <WindowsLogo size={32} color="goldenrod" />;
    } else {
        return <Question size={32} color="gray" />;
    }
};

const ProductStatusLogo = ({ status }) => {
    switch (status) {
        case 0:
            return <WarningCircle color="red" size={20} />;
        case 1:
            return <CheckCircle color="green" size={20} />;
        case 2:
            return <PauseCircle color="dimgray" size={20} />;

        default:
            return <WarningCircle color="red" size={20} />;
    }
};

const CardValue = ({ label, value }) => {
    return (
        <div style={{ display: "flex" }}>
            <span
                style={{
                    flex: 1,
                    fontSize: "small",
                    fontWeight: "bold",
                    alignItems: "center",
                }}
            >
                {label}
            </span>
            <span
                style={{
                    flex: 2,
                    fontSize: "small",
                }}
            >
                {value}
            </span>
        </div>
    );
};

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
                    <div className={`responsiveWrapper ${style.headerContent}`}>
                        <img src={logo} />
                        <span className={style.logoName}>Frontend</span>
                    </div>
                </header>
                <div className="responsiveWrapper">
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
                <div className={`responsiveWrapper ${style.content}`}>
                    <div
                        className="content-panel"
                        style={{
                            // backgroundColor: "lightcyan",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div className="vertical-tabs">
                            <a
                                href="#"
                                className="active"
                                style={{
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
                                                {getOSLogo(p?.platforms)}
                                            </span>
                                            <h3>{p?.name}</h3>
                                        </div>
                                        <ProductStatusLogo status={p.status} />
                                        {/* <label className="toggle">
                                            <input type="checkbox" checked />
                                            <span></span>
                                        </label> */}
                                    </div>
                                    <div className="card-body">
                                        <CardValue
                                            label="Description:"
                                            value={p.description}
                                        />
                                        <CardValue
                                            label="Value:"
                                            value={p.value}
                                        />
                                        <CardValue
                                            label="Created:"
                                            value={p.createdAt}
                                        />
                                        <CardValue
                                            label="Updated:"
                                            value={p.updatedAt}
                                        />
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
