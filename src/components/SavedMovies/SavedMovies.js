import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies }) {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={savedMovies} />
    </main>
  );
}

export default SavedMovies;
