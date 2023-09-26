import React from "react";
import logo from "../assets/img/logo.png";
const Header = () => {
  return (
    <header class="header">
      <div class="header-content responsive-wrapper">
        <div class="header-logo">
          <a className="logo-name" href="#">
            <div>
              <img src={logo} />
            </div>
            <span>{"<titolo>"}</span>
          </a>
        </div>
        <div class="header-navigation">
          <nav class="header-navigation-links">
            {/* <a href="#"> Home </a>
            <a href="#"> Dashboard </a>
            <a href="#"> Projects </a>
            <a href="#"> Tasks </a>
            <a href="#"> Reporting </a>
            <a href="#"> Users </a> */}
          </nav>
          <div class="header-navigation-actions">
            {/* <a href="#" class="button">
              <i class="ph-lightning-bold"></i>
              <span>Upgrade now</span>
            </a>
            <a href="#" class="icon-button">
              <i class="ph-gear-bold"></i>
            </a>
            <a href="#" class="icon-button">
              <i class="ph-bell-bold"></i>
            </a>
            <a href="#" class="avatar">
              <img src="https://assets.codepen.io/285131/hat-man.png" alt="" />
            </a> */}
          </div>
        </div>
        <a href="#" class="button">
          <i class="ph-list-bold"></i>
          <span>Menu</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
