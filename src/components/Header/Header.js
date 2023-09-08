import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "./Logo/Logo";
import Navigation from "./Navigation/Navigation";
import AuthNavigation from "./AuthNavigation/AuthNavigation";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  function handleMenuBtnClick() {
    setIsOpen(!isOpen);
  }

  // Check if the path is "/signup", "/signin", or a 404 page, and hide the header if necessary.
  const shouldHideHeader =
    location.pathname === "/signup" ||
    location.pathname === "/signin" ||
    location.pathname === "/*";

  return shouldHideHeader ? null : (
    <header
      className={`header ${location.pathname === "/" ? "header-main" : ""}`}
    >
      <Logo />
      {location.pathname === "/" ? (
        <Navigation />
      ) : (
        <AuthNavigation
          handleMenuBtnClick={handleMenuBtnClick}
          isOpen={isOpen}
        />
      )}
    </header>
  );
}

export default Header;

