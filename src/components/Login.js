import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import useTitle from "../hooks/useTitle";
import login from "../assets/img/login.png";
const Login = () => {
  useTitle("User Login");
  return (
    <>
      <Header />
      <main className="main">
        <div className="responsive-wrapper">
          <div className="content">
            <div className="content-login">
              <article className="card card-login">
                <div className="card-header">
                  <div>
                    <span>
                      <img src={login} />
                    </span>
                    <h3>Login</h3>
                  </div>
                </div>
                <div className="card-body">
                  <form
                    className="form"
                    // onSubmit={handleSubmit}
                  >
                    <label htmlFor="username">Your email</label>
                    <input
                      type="text"
                      id="username"
                      // ref={userRef}
                      // value={username}
                      // onChange={handleUserInput}
                      autoComplete="off"
                      required
                    />

                    <label htmlFor="password">Your password</label>
                    <input
                      type="password"
                      id="password"
                      // onChange={handlePwdInput}
                      // value={password}
                      required
                    />
                    <button>Sign In</button>
                    <span
                      style={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-end",
                      }}
                    >
                      <label className="toggle">
                        <input type="checkbox" checked />
                        <span></span>
                      </label>
                      Trust this device
                    </span>
                    {/* <label htmlFor="persist" className="form__persist">
                      <input
                        type="checkbox"
                        className="form__checkbox"
                        id="persist"
                        // onChange={handleToggle}
                        // checked={persist}
                      />
                      Trust This Device
                    </label> */}
                  </form>
                </div>
                <div className="card-footer">
                  <Link to="/">Back to Home</Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
