import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="aboutProject">
      <div className="aboutProject__container">
        <h2 className="aboutProject__title">О проекте</h2>
        <ul className="aboutProject__list">
          <li className="aboutProject__item">
            <h3 className="aboutProject__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="aboutProject__about">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>

          <li className="aboutProject__item">
            <h3 className="aboutProject__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="aboutProject__about">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="aboutProject__progress">
          <div className="aboutProject__backend">
            <span className="aboutProject__backend-duration">1 неделя</span>
            <span className="aboutProject__progress-title">Back-end</span>
          </div>
          <div className="aboutProject__frontend">
            <span className="aboutProject__frontend-duration">4 недели</span>
            <span className="aboutProject__progress-title">Front-end</span>
          </div>
        </div>
      </div>
    </section>
  );
}
