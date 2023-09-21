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
    setIsLoading(true);

    setTimeout(() => {
      setMovies(moviesData);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="movies" aria-label="Фильмы">
      <SearchForm />
      {isLoading ? <Preloader /> : null}
      <MoviesCardList movies={movies} />
    </section>
  );
}

export default Movies;
