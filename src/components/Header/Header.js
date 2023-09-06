import "./Header.css";
import Navigation from "./Navigation/Navigation";
import AuthNavigation from "./AuthNavigation/AuthNavigation";
import Logo from "./Logo/Logo";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  function handleMenuBtnClick() {
    setIsOpen(!isOpen);
  }

  // Проверяем, является ли путь "/signup", "/signin" или это страница 404, и скрываем header при необходимости.
  const shouldHideHeader =
    location.pathname === "/signup" ||
    location.pathname === "/signin" ||
    location.pathname === "/*";

  return shouldHideHeader ? null : (
    <header
      className={`header ${location.pathname === "/" ? "header__main" : ""}`}
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
