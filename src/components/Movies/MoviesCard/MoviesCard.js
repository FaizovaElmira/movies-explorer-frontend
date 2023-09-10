import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ card }) {
  const location = useLocation();
  const [isCardSaved, setIsCardSaved] = useState(card.saved);

  const handleOnClick = () => {
    if (card && card.saved !== undefined) {
      setIsCardSaved(!isCardSaved);
    }
  };

  const renderActionButton = () => {
    if (location.pathname === "/movies") {
      const buttonType = !isCardSaved ? "save" : "saved";
      return (
        <button
          type="button"
          className={`moviesCard__button moviesCard__button_type_${buttonType}`}
          onClick={handleOnClick}
        ></button>
      );
    } else if (location.pathname === "/saved-movies") {
      return (
        <button
          type="button"
          className="moviesCard__button moviesCard__button_type_unsave"
        ></button>
      );
    }
  };

  return (
    <li className="moviesCard">
      <article className="moviesCard__item">
        <img
          src={card.poster}
          alt={card.title}
          className="moviesCard__poster"
        />
        <div className="moviesCard__description">
          <h2 className="moviesCard__title">{card.title}</h2>
          {renderActionButton()}
        </div>
        <span className="moviesCard__duration">{card.duration}</span>
      </article>
    </li>
  );
}

export default MoviesCard;
