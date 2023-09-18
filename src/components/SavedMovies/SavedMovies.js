import React, { useEffect, useState } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Preloader from '../Movies/Preloader/Preloader';

function SavedMovies(props) {
  const [filteredSaveMovies, setFilteredSaveMovies] = useState([]);

  const [isSavedQuery, setIsSavedQuery] = useState(false);
  const [searchSavedMovieText, setSearchSavedMovieText] = useState('');
  const [errorSaveSearchMessage, setErrorSaveSearchMessage] = useState('');
  const [isSaveFilterCheckboxOn, setIsSaveFilterCheckboxOn] = useState(false);

  const handleInputChange = (e) => {
    setSearchSavedMovieText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.setIsLoading(true);
    setIsSavedQuery(true);
  };

  const checkboxHandler = (e) => {
    setIsSavedQuery(true);
    setIsSaveFilterCheckboxOn(e.target.checked);
  };

  useEffect(() => {
    if (isSavedQuery) {
      const queryText = searchSavedMovieText.trim().toLowerCase();
      setErrorSaveSearchMessage('');
      let filteredMovies = props.savedMovies.filter(
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
    props.setIsLoading(false);
  }, [isSavedQuery, props.savedMovies, filteredSaveMovies]);

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
      {props.isLoading ? <Preloader /> : null}
      <MoviesCardList movies={filteredSaveMovies} />
    </section>
  );
}

export default SavedMovies;
