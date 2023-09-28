import React from "react";
import logo from "../assets/img/logo.png";
import style from "../assets/styles/LoginPage.module.scss";
import { Globe } from "@phosphor-icons/react/dist/ssr";
import { AppWindow, Monitor, User } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <main className={style.mainLogin}>
      <div className={style.content}>
        <div className={style.logoHeader}>
          <img src={logo} />
        </div>
        <h1>Frontend</h1>
        <article class="card">
          <div class="card-body">
            <form>
              <label htmlFor="username">Your email</label>
              <input type="text" id="username" autoComplete="off" required />
              <label htmlFor="password">Your password</label>
              <input type="password" id="password" required />
              <button style={{ margin: "0.8rem 0" }}>Sign In</button>
              <span className="toggle-box">
                <label className="toggle">
                  <input type="checkbox" checked />
                  <span></span>
                </label>
                Trust this device
              </span>
            </form>
          </div>
          <div class="card-footer">
            <a href="#">Forgot password</a>
            <a href="#">Sign up</a>
          </div>
        </article>
      </div>
      <div className={style.content}>
        <div
          style={{ display: "flex", gap: ".7rem", justifyContent: "center" }}
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
        {/* <article class="card">
          <div class="card-body">
            <AppWindow size={44} />
          </div>
        </article> */}
      </div>
    </main>
  );
};

export default LoginPage;
