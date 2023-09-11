import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies }) {
  return (
    <section className="saved-movies" aria-label="Сохраненные фильмы">
      <SearchForm />
      <MoviesCardList movies={savedMovies} />
    </section>
  );
}

export default SavedMovies;
