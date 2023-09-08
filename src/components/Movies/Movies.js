import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import moviesData from "../../utils/movies";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Включить прелоадер перед загрузкой фильмов
    setIsLoading(true);

    setTimeout(() => {
      setMovies(moviesData);
      // Выключить прелоадер после загрузки фильмов
      setIsLoading(false);
    }, 1000); // Заменить на реальный запрос к серверу

    // В данном примере, имитируем загрузку данных с задержкой в 1 секунду
  }, []);

  return (
    <main className='movies'>
      <SearchForm />
      {/* Показывайть прелоадер только при загрузке данных */}
      {isLoading ? <Preloader /> : null}
      <MoviesCardList movies={movies} />
      </main>
  );
}

export default Movies;
