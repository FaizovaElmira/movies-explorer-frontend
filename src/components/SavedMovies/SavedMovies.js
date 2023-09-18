import React, { useEffect, useState } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Preloader from '../Movies/Preloader/Preloader';

function SavedMovies({ savedMovies, setIsLoading, isLoading }) {
  const [filteredSaveMovies, setFilteredSaveMovies] = useState(savedMovies);
  const [isSavedQuery, setIsSavedQuery] = useState(false);
  const [searchSavedMovieText, setSearchSavedMovieText] = useState('');
  const [errorSaveSearchMessage, setErrorSaveSearchMessage] = useState('');
  const [isSaveFilterCheckboxOn, setIsSaveFilterCheckboxOn] = useState(false);

  const handleInputChange = (e) => {
    setSearchSavedMovieText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setIsSavedQuery(true);
  };

  const checkboxHandler = (e) => {
    setIsSavedQuery(true);
    setIsSaveFilterCheckboxOn(e.target.checked);
  };

  useEffect(() => {
    setFilteredSaveMovies(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    if (isSavedQuery) {
      const queryText = searchSavedMovieText.trim().toLowerCase();
      setErrorSaveSearchMessage('');
      let filteredMovies = savedMovies.filter(
        (m) =>
          m.nameRU.toLowerCase().includes(queryText) ||
          m.nameEN.toLowerCase().includes(queryText)
      );
      if (isSaveFilterCheckboxOn) {
        filteredMovies = filteredMovies.filter((m) => m.duration <= 40);
      }
      if (!filteredMovies.length) {
        setErrorSaveSearchMessage('Ничего не найдено');
      }
      setFilteredSaveMovies(filteredMovies);
    }
    setIsSavedQuery(false);
    setIsLoading(false);
  }, [isSavedQuery, savedMovies, searchSavedMovieText, isSaveFilterCheckboxOn, setIsLoading]);
  

  return (
    <section className='saved-movies' aria-label='Сохраненные фильмы'>
      <SearchForm
        searchText={searchSavedMovieText}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        errorSearchMessage={errorSaveSearchMessage}
        checkboxHandler={checkboxHandler}
        checkboxValue={isSaveFilterCheckboxOn}
      />
      {isLoading ? <Preloader /> : null}
      <MoviesCardList movies={filteredSaveMovies} />
    </section>
  );
}

export default SavedMovies;
