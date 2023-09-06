import "./AboutMe.css";
import avatar from "../../../images/vitalik.png";

export default function AboutMe() {
  return (
    <section className="aboutMe">
      <div className="aboutMe__content">
        <h2 className="aboutMe__title">Студент</h2>
        <div className="aboutMe__bio-content">
          <div className="aboutMe__bio">
            <h3 className="aboutMe__name">Виталий</h3>
            <p className="aboutMe__description">Фронтенд-разработчик, 30 лет</p>
            <p className="aboutMe__story">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <ul className="aboutMe__socials">
              <li>
                <a
                  href="https://github.com/FaizovaElmira"
                  target="_blank"
                  rel="noreferrer"
                  className="aboutMe__social-link"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img className="aboutMe__avatar" src={avatar} alt="аватар" />
        </div>
      </div>
    </section>
  );
}
