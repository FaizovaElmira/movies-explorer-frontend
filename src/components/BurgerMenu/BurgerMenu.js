import React from "react";
import "./BurgerMenu.css";

function BurgerMenu(props) {
  return (
    <button
      onClick={props.handleMenuBtnClick}
      className={`burgerMenu ${props.isOpen ? "burgerMenu_open" : ""}`}
    >
      <span></span>
    </button>
  );
}

export default BurgerMenu;
