import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ movies }) {
  const location = useLocation();
  const [screenWidth, setScreenWidth] = useState(
    document.documentElement.clientWidth
  );
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(0);

  const handleResizeWidth = useCallback(() => {
    setScreenWidth(document.documentElement.clientWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResizeWidth);

    return () => {
      window.removeEventListener('resize', handleResizeWidth);
    };
  }, [handleResizeWidth]);

  useEffect(() => {
    if (screenWidth >= 1280) {
      setVisibleMoviesCount(
        location.pathname === '/saved-movies' ? movies.length : 12
      );
    } else if (screenWidth >= 768) {
      setVisibleMoviesCount(
        location.pathname === '/saved-movies' ? movies.length : 8
      );
    } else {
      setVisibleMoviesCount(
        location.pathname === '/saved-movies' ? movies.length : 5
      );
    }
  }, [location.pathname, screenWidth, movies.length]);


  const renderMovies = () => {
    return movies
      .slice(0, visibleMoviesCount)
      .map((card) => <MoviesCard key={card.id || card._id} card={card} />);
  };

  const handleShowMoreClick = () => {
    if (screenWidth >= 1280) {
      setVisibleMoviesCount((prevCount) => prevCount + 3); 
    } else {
      setVisibleMoviesCount((prevCount) => prevCount + 2); 
    }
  };
  

  const shouldRenderShowMoreButton =
    location.pathname === '/movies' && visibleMoviesCount < movies.length;

  let containerClass = 'moviesCardList';
  if (location.pathname === '/movies') {
    containerClass += ' moviesCardList--movies';
  } else if (location.pathname === '/saved-movies') {
    containerClass += ' moviesCardList--saved-movies';
  }

  return (
    <section className={containerClass}>
      <ul className='moviesCardList__list'>{renderMovies()}</ul>
      {shouldRenderShowMoreButton && (
        <button
          className='moviesCardList__showMore'
          onClick={handleShowMoreClick}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
