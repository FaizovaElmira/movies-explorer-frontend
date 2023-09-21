import { NavLink } from "react-router-dom";
import "./AuthNavigation.css";
import userIcon from "../../../images/icon-account.svg";
import BurgerMenu from "../../BurgerMenu/BurgerMenu";

function AuthNavigation(props) {
  return (
    <>
      <BurgerMenu
        isOpen={props.isOpen}
        handleMenuBtnClick={props.handleMenuBtnClick}
      />
      <div className={`menu ${props.isOpen && "menu_opened"}`}>
        <nav>
          <ul
            className={`authNavigation list ${
              props.isOpen && "authNavigation_opened"
            }`}
          >
            {props.isOpen && (
              <li className="authNavigation__item">
                <NavLink className="link authNavigation__link" to="/" aria-label="Перейти на главную страницу">
                  Главная
                </NavLink>
              </li>
            )}
            <li className="authNavigation__item">
              <NavLink className="link authNavigation__link" to="/movies" aria-label="Перейти на страницу с фильмами">
                Фильмы
              </NavLink>
            </li>
            <li className="authNavigation__item">
              <NavLink className="link authNavigation__link" to="/saved-movies" aria-label="Перейти на страницу с сохраненными фильмами">
                Сохраненные фильмы
              </NavLink>
            </li>
            <li className="authNavigation__item authNavigation__item_type_profile">
              <NavLink className="link" to="/profile" aria-label="Перейти в профиль">
                Аккаунт
              </NavLink>
              <img
                src={userIcon}
                alt="Перейти в профиль"
                className="user-icon" aria-label="Иконка профиля"
              />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default AuthNavigation;
