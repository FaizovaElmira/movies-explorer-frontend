import { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies(props) {
  const [isSearchTextEmpty, setIsSearchTextEmpty] = useState(false);
  const [isQuery, setIsQuery] = useState(false);

  const handleInputChange = (e) => {
    props.setSearchMovieText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.searchMovieText.trim().length === 0) {
      setIsSearchTextEmpty(true);
      props.setSearchMovieText('');
    } else {
      props.setIsLoading(true);
      setIsQuery(true);
      setIsSearchTextEmpty(false);
      localStorage.setItem('searchMovieText', props.searchMovieText);
      props.setErrorSearchMessage('');
    }
  };

  const checkboxHandler = (e) => {
    setIsQuery(true);
    props.setIsFilterCheckboxOn(e.target.checked);
    localStorage.setItem('isFilterCheckboxOn', e.target.checked);
  };

  useEffect(() => {
    if (isQuery) {
      const queryText = props.searchMovieText.trim().toLowerCase();
      if (queryText) {
        let filteredMovies = props.moviesFromApi.filter(
          (m) =>
            m.nameRU.toLowerCase().includes(queryText) ||
            m.nameEN.toLowerCase().includes(queryText)
        );
        if (props.isFilterCheckboxOn) {
          filteredMovies = filteredMovies.filter((m) => m.duration <= 40);
        }
        if (!filteredMovies.length) {
          props.setErrorSearchMessage('Ничего не найдено');
        }
        props.setMoviesFromSearch(filteredMovies);
        localStorage.setItem(
          'moviesFromSearch',
          JSON.stringify(filteredMovies)
        );
      }
      setIsQuery(false);
      props.setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isFilterCheckboxOn, props.moviesFromSearch, isQuery]);
  return (
    <section className='movies' aria-label='Фильмы'>
      <SearchForm
        searchText={props.searchMovieText}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        errorSearchMessage={props.errorSearchMessage}
        isSearchTextEmpty={isSearchTextEmpty}
        checkboxHandler={checkboxHandler}
        checkboxValue={props.isFilterCheckboxOn}
      />
      {props.isLoading ? <Preloader /> : null}
      <MoviesCardList movies={props.moviesFromSearch} />
    </section>
  );
}

export default Movies;
