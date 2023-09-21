import "./Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  const shouldHideFooter =
    location.pathname === "/signup" ||
    location.pathname === "/signin" ||
    location.pathname === "/profile";

  if (shouldHideFooter) {
    return null;
  }

  return (
    <footer className="footer">
      <h1 className="footer__heading">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h1>
      <div className="footer__line">
        <p className="footer__copyright">© {new Date().getFullYear()}</p>
        <nav className="footer__links">
          <a
            className="footer__link "
            target="_blank"
            rel="noopener noreferrer"
            href="https://practicum.yandex.ru/"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link "
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/"
          >
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
