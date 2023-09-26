import React from "react";
import logo from "../assets/img/logo.png";
import style from "./Login.module.scss";

const Login = () => {
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
    </main>
  );
};

export default Login;
