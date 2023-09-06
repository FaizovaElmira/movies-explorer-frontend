import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies }) {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={savedMovies} />
    </div>
  );
}

export default SavedMovies;
