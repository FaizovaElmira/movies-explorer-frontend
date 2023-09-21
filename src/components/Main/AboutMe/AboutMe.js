import "./AboutMe.css";
import avatar from "../../../images/vitalik.png";

function AboutMe() {
  return (
    <section className="aboutMe" aria-label="Обо мне">
      <h2 className="aboutMe__title">Студент</h2>
      <article className="aboutMe__bio">
        <div className="aboutMe__bio-info">
          <h2 className="aboutMe__bio-name">Виталий</h2>
          <p className="aboutMe__description">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutMe__story">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="aboutMe__github-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/FaizovaElmira"
          >
            Github
          </a>
        </div>
        <img className="aboutMe__avatar" src={avatar} alt="аватар" />
      </article>
    </section>
  );
}
export default AboutMe;
