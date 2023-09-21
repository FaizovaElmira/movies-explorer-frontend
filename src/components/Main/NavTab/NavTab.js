import { Link } from "react-scroll";
import "./NavTab.css";

const NavTab = () => {
  return (
    <section className="navTab" aria-label="навигация по странице">
      <nav>
        <ul className="navTab__list">
          <li>
            <Link className="navTab__link" to="aboutProject" smooth={true}>
              О проекте
            </Link>
          </li>
          <li>
            <Link className="navTab__link" to="techs" smooth={true}>
              Технологии
            </Link>
          </li>
          <li>
            <Link className="navTab__link" to="aboutMe" smooth={true}>
              Студент
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default NavTab;
