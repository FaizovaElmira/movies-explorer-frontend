import React from "react";
import { useLocation } from "react-router-dom";
import iconfind from "../../../images/icon-find.svg";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm(props) {
  const location = useLocation();

  const searchClasses = `search ${
    location.pathname === "/saved-movies" ? "saved-movies" : "movies"
  }`;

  return (
    <section className={searchClasses}>
      <form className="search__form">
        <input type="text" className="search__input" placeholder="Фильм" />
        <button
          type="submit"
          className="search__button"
          aria-label="Кнопка поиска фильма"
        >
          <img src={iconfind} alt="Поиск" />
        </button>
      </form>
      <FilterCheckbox />
      <div className="search__line"></div>
    </section>
  );
}

export default SearchForm;
