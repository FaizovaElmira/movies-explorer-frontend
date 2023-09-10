import "./Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  // Проверяем, является ли путь "/signup", "/signin" скрываем Footer при необходимости.
  const shouldHideFooter =
    location.pathname === "/signup" ||
    location.pathname === "/signin" ||
    location.pathname === "/profile";

  if (shouldHideFooter) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className="footer__navigation">
          <p className="footer__copyright">&copy;{new Date().getFullYear()}</p>
          <ul className="footer__links-list">
            <li>
              <a
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
