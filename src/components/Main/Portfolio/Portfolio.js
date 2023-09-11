import "./Portfolio.css";
import ArrowLink from "../../../images/arrow-link.svg";

function Portfolio() {
  return (
    <section className="portfolio" aria-label="Портфолио">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__container">
        <ul className="portfolio__items">
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://faizovaelmira.github.io/how-to-learn/"
            >
              <p className="portfolio__link-text">Статичный сайт</p>
              <img
                className="portfolio__link-img"
                src={ArrowLink}
                alt="Ссылка на внешний сайт"
              />
            </a>
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://faizovaelmira.github.io/russian-travel/"
            >
              <p className="portfolio__link-text">Адаптивный сайт</p>
              <img
                className="portfolio__link-img"
                src={ArrowLink}
                alt="Ссылка на внешний сайт"
              />
            </a>
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://faizovaelmira.github.io/react-mesto-auth"
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
