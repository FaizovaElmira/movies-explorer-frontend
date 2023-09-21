import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
  return (
    <nav className="navigation">
      <Link
        to="/signup"
        className="link navigation__link"
        aria-label="Перейти к странице регистрации"
      >
        Регистрация
      </Link>
      <Link
        to="/signin"
        className="link navigation__link navigation__link-btn"
        aria-label="Перейти к странице войти"
      >
        Войти
      </Link>
    </nav>
  );
}

export default Navigation;
