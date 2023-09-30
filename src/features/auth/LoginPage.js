import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Monitor, User } from "@phosphor-icons/react";
import Popup from "../../components/Popup";
import useTitle from "../../hooks/useTitle";
import usePersist from "../../hooks/usePersist";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import logo from "../../assets/img/logo.png";
import style from "../../assets/styles/LoginPage.module.scss";

const LoginPage = () => {
    useTitle("Login");
    //? Solo per il focus
    const userRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //?
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //?
    const [persist, setPersist] = usePersist();
    //?
    const [login, { isLoading }] = useLoginMutation();

    //? focus user name field allo start
    useEffect(() => {
        userRef?.current?.focus();
    }, []);

    //? per rimuovere errore appena utente scrive
    useEffect(() => {
        setError();
    }, [email, password]);

    const handleOnLogin = async () => {
        try {
            if (!email?.length) {
                setError("Username field empty");
                return;
            }
            if (!password?.length) {
                setError("Password field empty");
                return;
            }
            //? prendo il token e lo setto nel modello
            const { accessToken, user } = await login({
                email,
                password,
            }).unwrap();
            dispatch(setCredentials({ accessToken, user }));
            //? pulisco interfaccia
            setEmail("");
            setPassword("");
            navigate("/board");
        } catch (err) {
            if (!err.status) {
                setError("No Server Response");
            } else if (err.status === 400) {
                setError("Invalid Username or Password");
            } else if (err.status === 401) {
                setError("Unauthorized");
            } else {
                setError(err.data?.message);
            }
        }
    };

    const handleOnUserInputChange = (e) => setEmail(e.target.value);
    const handleOnPwdInputChange = (e) => setPassword(e.target.value);
    const handleOnTrustDeviceInputChange = (e) => setPersist(e.target.checked);

    // if (isLoading) return <p>Loading...</p>;

    return (
        <main className={style.mainLogin}>
            <div className={style.content}>
                <div className={style.logoHeader}>
                    <img src={logo} />
                </div>
                {success && (
                    <Popup
                        title="Success"
                        message={success}
                        classType="successBg"
                    />
                )}
                {error && (
                    <Popup title="Error" message={error} classType="dangerBg" />
                )}
                <h1>Frontend</h1>
                <article className="card">
                    <div className="card-body">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="email">Email</label>
                            <input
                                disabled={isLoading}
                                ref={userRef}
                                value={email}
                                onChange={handleOnUserInputChange}
                                type="text"
                                placeholder="e.g. jhon@doe.com"
                                id="email"
                                autoComplete="off"
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                disabled={isLoading}
                                value={password}
                                onChange={handleOnPwdInputChange}
                                type="password"
                                id="password"
                                placeholder="e.g. bestPassw0rd"
                            />
                            <button
                                style={{ margin: "0.8rem 0" }}
                                disabled={isLoading}
                                onClick={handleOnLogin}
                                className="loading"
                            >
                                {isLoading ? "Loading..." : "Sign In"}
                            </button>
                            {/* <button
                style={{ margin: "0.8rem 0" }}
                disabled={isLoading}
                onClick={() => {
                  setToken({ id: 1, token: "60b8e2d93e89495dd064d92d" });
                }}
                className={!isLoading ?? "loading"}
              >
                {isLoading ? "Loading..." : "Sign Out"}
              </button> */}
                            <span className="toggle-box">
                                <label className="toggle">
                                    <input
                                        value={persist}
                                        onChange={
                                            handleOnTrustDeviceInputChange
                                        }
                                        disabled={isLoading}
                                        type="checkbox"
                                    />
                                    <span></span>
                                </label>
                                Trust this device
                            </span>
                        </form>
                    </div>
                    <div className="card-footer">
                        <Link disabled={isLoading} href="#">
                            Forgot password
                        </Link>
                        <Link disabled={isLoading} href="#">
                            Sign up
                        </Link>
                    </div>
                </article>
            </div>
            <div className={style.content}>
                <div
                    style={{
                        display: "flex",
                        gap: ".7rem",
                        justifyContent: "center",
                    }}
                >
                    <Link to={"/products"} style={{ textDecoration: "none" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: ".4rem",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#404089",
                                    height: 44,
                                    width: 44,
                                    borderRadius: 22,
                                }}
                            >
                                <Monitor size={24} color="snow" />
                            </div>
                        </div>
                    </Link>
                    <Link to={"/users"} style={{ textDecoration: "none" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: ".4rem",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "MediumSeaGreen",
                                    height: 44,
                                    width: 44,
                                    borderRadius: 22,
                                }}
                            >
                                <User size={24} color="snow" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
