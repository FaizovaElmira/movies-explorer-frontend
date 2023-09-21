import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { BASE_URL } from '../../../constants';
import { AppContext } from '../../../contexts/AppContext';

function MoviesCard({ card }) {
  const { savedMovies, toggleSaveCard } = useContext(AppContext);
  const location = useLocation();

  const savedCard = savedMovies?.find((m) => m.movieId === card.id || card._id);

  const buttonType = savedCard ? 'saved' : 'save';

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
          {location.pathname === '/movies' ? (
            <button
              type='button'
              className={`moviesCard__button moviesCard__button_type_${buttonType}`}
              onClick={() => toggleSaveCard(card, savedCard)}
              aria-label={
                savedCard ? 'Удалить из сохраненных' : 'Сохранить в избранное'
              }
            ></button>
          ) : (
            <button
              type='button'
              className='moviesCard__button moviesCard__button_type_unsave'
              onClick={() => toggleSaveCard(card, savedCard)}
            ></button>
          )}
        </div>
        <span className='moviesCard__duration'>
          {changeDurationFormat(card.duration)}
        </span>
      </article>
    </li>
  );
}

export default MoviesCard;
