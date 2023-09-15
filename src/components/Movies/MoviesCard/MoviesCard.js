import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { BASE_URL } from '../../../constants';

function MoviesCard({ card }) {
  const location = useLocation();
  const [isCardSaved, setIsCardSaved] = useState(card.saved);

  const handleOnClick = () => {
    if (card && card.saved !== undefined) {
      setIsCardSaved(!isCardSaved);
    }
  };

  const renderActionButton = () => {
    if (location.pathname === '/movies') {
      const buttonType = !isCardSaved ? 'save' : 'saved';
      return (
        <button
          type='button'
          className={`moviesCard__button moviesCard__button_type_${buttonType}`}
          onClick={handleOnClick}
          aria-label={
            isCardSaved ? 'Удалить из сохраненных' : 'Сохранить в избранное'
          }
        ></button>
      );
    } else if (location.pathname === '/saved-movies') {
      return (
        <button
          type='button'
          className='moviesCard__button moviesCard__button_type_unsave'
        ></button>
      );
    }
  };

  const changeDurationFormat = (duration) => {
    const min = duration % 60;
    const hour = Math.floor(duration / 60);
    return hour ? `${hour}ч ${min}м` : `${min}м`;
  };

  return (
    <li className='moviesCard'>
      <article className='moviesCard__item'>
        <Link to={card.trailerLink} target='_blank'>
          <img
            src={card.image.url ? BASE_URL + card.image.url : card.image}
            alt={card.title}
            className='moviesCard__poster'
          />
        </Link>
        <div className='moviesCard__description'>
          <h2 className='moviesCard__title'>{card.nameRU}</h2>
          {renderActionButton()}
        </div>
        <span className='moviesCard__duration'>
          {changeDurationFormat(card.duration)}
        </span>
      </article>
    </li>
  );
}

export default MoviesCard;
