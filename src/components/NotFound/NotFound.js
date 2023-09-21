import "./NotFound.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound({ onSetShouldHideHeaderFooter }) {
  const navigate = useNavigate();

  onSetShouldHideHeaderFooter(true);

  return (
    <section className="notFound" aria-label="Страница не найдена">
      <h1 className="notFound__title">404</h1>
      <p className="notFound__subtitle">Страница не найдена</p>
      <button className="notFound__btn" onClick={() => navigate(-1)}>
        Назад
      </button>
    </section>
  );
}

export default NotFound;
