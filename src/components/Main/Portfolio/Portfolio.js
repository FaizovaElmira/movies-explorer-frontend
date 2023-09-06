import "./Portfolio.css";
import ArrowLink from "../../../images/arrow-link.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__list-item">
            <a
              className="portfolio__link hover-link"
              href="https://faizovaelmira.github.io/how-to-learn/"
              target="_blank"
              rel="noreferrer"
            >
              <p className="portfolio__link-text">Статичный сайт</p>
              <img
                className="portfolio__link-img"
                src={ArrowLink}
                alt="Ссылка на внешний сайт"
              />
            </a>
          </li>
          <li className="portfolio__list-item">
            <a
              className="portfolio__link hover-link"
              href="https://faizovaelmira.github.io/russian-travel/"
              target="_blank"
              rel="noreferrer"
            >
              <p className="portfolio__link-text">Адаптивный сайт</p>
              <img
                className="portfolio__link-img"
                src={ArrowLink}
                alt="Ссылка на внешний сайт"
              />
            </a>
          </li>
          <li className="portfolio__list-item">
            <a
              className="portfolio__link hover-link"
              href="https://faizovaelmira.github.io/react-mesto-auth"
              target="_blank"
              rel="noreferrer"
            >
              <p className="portfolio__link-text">Одностраничное приложение</p>
              <img
                className="portfolio__link-img"
                src={ArrowLink}
                alt="Ссылка на внешний сайт"
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
