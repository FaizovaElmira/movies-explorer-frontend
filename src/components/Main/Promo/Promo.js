import "./Promo.css";
import logo from "../../../images/logo-promo.svg";
import React from "react";

function Promo(props) {
  return (
    <section className="promo">
      <img src={logo} alt="Logo" className="promo__logo" />
      <p className="promo__text">
        Учебный проект студента факультета Веб-разработки.
      </p>
    </section>
  );
}

export default Promo;
