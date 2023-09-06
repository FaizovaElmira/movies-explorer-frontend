import "./BurgerMenu.css";

function BurgerMenu(props) {
  return (
    <>
      <div
        onClick={props.handleMenuBtnClick}
        className={`burgerMenu ${props.isOpen ? "burgerMenu_open" : ""}`}
      >
        <span></span>
      </div>
    </>
  );
}

export default BurgerMenu;
