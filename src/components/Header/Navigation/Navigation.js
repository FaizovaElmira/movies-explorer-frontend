import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
  return (
    <div className="navigation">
      <Link to="/signup" className="navigation__link">
        Регистрация
      </Link>
      <Link to="/signin" className="navigation__link navigation__link-btn">
        Войти
      </Link>
    </div>
  );
}

export default Navigation;

