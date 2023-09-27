import React from "react";
import { Link } from "react-router-dom";
import style from "./Products.module.scss";
import {
    Trash,
    PencilSimpleLine,
    AndroidLogo,
    AppleLogo,
    CheckCircle,
    WarningCircle,
    Question,
    WindowsLogo,
    PauseCircle,
    AppStoreLogo,
    Circuitry,
    Cloud,
} from "@phosphor-icons/react";

const getOSLogo = (oss) => {
    if (oss?.some((os) => os === "Android")) {
        return <AndroidLogo size={32} color="limegreen" />;
    } else if (oss?.some((os) => os === "iOS")) {
        return <AppStoreLogo size={32} color="royalBlue" />;
    } else if (oss?.some((os) => os === "Win")) {
        return <WindowsLogo size={32} color="SandyBrown" />;
    } else if (oss?.some((os) => os === "Mac")) {
        return <AppleLogo size={32} color="skyblue" />;
    } else if (oss?.some((os) => os === "Hardware")) {
        return <Circuitry size={32} color="hotpink" />;
    } else if (oss?.some((os) => os === "Cloud")) {
        return <Cloud size={32} color="DodgerBlue" />;
    } else {
        return <Question size={32} color="gray" />;
    }
};

const ProductStatusLogo = ({ status }) => {
    switch (status) {
        case 0:
            return <WarningCircle color="red" size={22} />;
        case 1:
            return <CheckCircle color="green" size={22} />;
        case 2:
            return <PauseCircle color="dimgray" size={22} />;
        default:
            return <Question color="gray" size={22} />;
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

const ProductList = ({
    searchResults = [],
    onEditClicked,
    onDeleteClicked,
}) => {
    return (
        <div className={`responsiveWrapper ${style.content}`}>
            <div className="card-grid">
                {searchResults.map((p) => {
                    return (
                        <article key={p.id} className="card">
                            <div className="card-header">
                                <div>
                                    <span>{getOSLogo(p?.platforms)}</span>
                                    <h3>{p?.name}</h3>
                                </div>
                                <ProductStatusLogo status={p.status} />
                            </div>
                            <div className="card-body">
                                <CardValue
                                    label="Description:"
                                    value={p.description}
                                />
                                <CardValue label="Value:" value={p.value} />
                                <CardValue
                                    label="Store Id:"
                                    value={p.store ?? "-"}
                                />
                                <CardValue
                                    label="Security:"
                                    value={p.security}
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
                                <span
                                    className="icon-button"
                                    onClick={() =>
                                        onDeleteClicked({ productId: p.id })
                                    }
                                >
                                    <Trash size={22} color="crimson" />
                                </span>
                                <span
                                    className="icon-button"
                                    onClick={() =>
                                        onEditClicked({ productId: p.id })
                                    }
                                >
                                    <PencilSimpleLine
                                        size={22}
                                        color="royalBlue"
                                    />
                                </span>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductList;
