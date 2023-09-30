import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    selectAllProducts,
    useDeleteProductMutation,
    useGetProductsQuery,
    useUpdateProductStatusMutation,
} from "./productsSlice";
import { useSelector } from "react-redux";
import { compareAsc, parseISO } from "date-fns";
import style from "../../assets/styles/Products.module.scss";
import {
    MagnifyingGlass,
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
    Globe,
} from "@phosphor-icons/react";
import useTitle from "../../hooks/useTitle";
import ProductHeader from "./ProductHeader";
import Dialog from "../../components/Dialog.js";
import Popup from "../../components/Popup";

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
    } else if (oss?.some((os) => os === "Web")) {
        return <Globe size={32} color="Tomato" />;
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

const ProductsPage = () => {
    useTitle("Product List");

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [dialog, setDialog] = useState({ visible: false });
    const [prods, setProds] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const products = useSelector(selectAllProducts)?.sort((a, b) => {
        if (!b?.updatedAt || !a?.updatedAt) return 0;
        const aDate = parseISO(a.updatedAt);
        const bDate = parseISO(b.updatedAt);
        return compareAsc(bDate, aDate);
    });

    const {
        isLoading,
        isSuccess,
        isError,
        error: getProductsError,
    } = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProductStatus] = useUpdateProductStatusMutation();

    useEffect(() => {
        setProds(products);
        setSearchResults(products);
    }, [products]);

    if (isLoading) {
        return <p>"Loading..."</p>;
    }
    if (isError) {
        return <p>{getProductsError}</p>;
    }

    const handleOnProductStatusChange = async (e, id) => {
        console.log(e.target.checked);
        try {
            await updateProductStatus({
                id,
                status: e.target.checked ? 1 : 0,
            }).unwrap();
            setSuccess("Hooray! Product status updated!");
            setTimeout(() => {
                setSuccess();
            }, 2000);
        } catch (err) {
            console.log(err);
            setError(
                err?.message
                    ? err.message
                    : "An unknow error occurred, please try again later."
            );
            setTimeout(() => {
                setError();
            }, 3000);
        }
    };

    const DeleteDialog = () => {
        async function handleDialogOnClose() {
            console.log("Modal has closed");
            setDialog({ visible: false });
        }

        async function handleDialogOnOk() {
            const id = dialog?.params?.id;
            console.log("Ok was clicked", id);
            setDialog({ visible: false });
            try {
                await deleteProduct({ id: id }).unwrap();
                setSuccess("Hooray! Product deleted.");
                setTimeout(() => {
                    setSuccess();
                }, 2000);
            } catch (err) {
                console.log(err);
                setError(
                    err?.message
                        ? err.message
                        : "An unknow error occurred, please try again later."
                );
                setTimeout(() => {
                    setError();
                }, 3000);
            }
        }

        return (
            <Dialog
                title={dialog?.title}
                visible={dialog?.visible === true}
                onClose={handleDialogOnClose}
                onOk={handleDialogOnOk}
            >
                {dialog?.message}
            </Dialog>
        );
    };

    if (isSuccess) {
        return (
            <>
            
                <DeleteDialog />
                <ProductHeader
                    rightBarComponents={
                        <SearchBar
                            products={prods}
                            setSearchResult={setSearchResults}
                        />
                    }
                />
                {success && (
                    <Popup
                        title="Success"
                        message={success}
                        classType="successBg"
                        type="fixed"
                    />
                )}
                {error && (
                    <Popup
                        title="Error"
                        message={error}
                        classType="dangerBg"
                        type="fixed"
                    />
                )}
                <div className={`responsiveWrapper ${style.content}`}>
                    <div className="card-grid">
                        {searchResults.map((p) => {
                            return (
                                <article key={p.id} className="card">
                                    <div className="card-header">
                                        <div>
                                            <span>
                                                {getOSLogo(p?.platforms)}
                                            </span>
                                            <h3>{p?.name}</h3>
                                        </div>
                                        <ProductStatusLogo status={p.status} />
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
                                            label="Store Id:"
                                            value={
                                                p?.store?.length > 0
                                                    ? p.store
                                                    : "-"
                                            }
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
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "0.2rem",
                                                alignItems: "center",
                                            }}
                                        >
                                            <small>Enable:</small>
                                            <label className="toggle">
                                                <input
                                                    type="checkbox"
                                                    checked={p.status === 1}
                                                    onChange={(e) =>
                                                        handleOnProductStatusChange(
                                                            e,
                                                            p.id
                                                        )
                                                    }
                                                />
                                                <span></span>
                                            </label>
                                        </div>
                                        <span
                                            // to={`/products?showDialog=${p.id}`}
                                            onClick={() => {
                                                setDialog({
                                                    visible: true,
                                                    title: `Delete product`,
                                                    message: `Are you sure you want to delte ${p?.name}?`,
                                                    params: { id: p?.id },
                                                });
                                            }}
                                            className="icon-button"
                                        >
                                            <Trash size={22} color="crimson" />
                                        </span>
                                        <Link
                                            to={`${p.id}`}
                                            className="icon-button"
                                        >
                                            <PencilSimpleLine
                                                size={22}
                                                color="royalBlue"
                                            />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
                
            </>
        );
    }
};

export default ProductsPage;
