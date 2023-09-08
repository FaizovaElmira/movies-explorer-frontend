import "./NotFound.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound({ onSetShouldHideHeaderFooter }) {
  const navigate = useNavigate();

  // Call the callback function to set shouldHideHeaderFooter to true
  onSetShouldHideHeaderFooter(true);

  return (
    <main className="notFound">
      <div className="notFound__container">
        <h2 className="notFound__title">404</h2>
        <p className="notFound__subtitle">Страница не найдена</p>
      </div>
      <button className="notFound__btn" onClick={() => navigate(-1)}>
        Назад
      </button>
    </main>
  );
}

export default NotFound;
