import React from 'react';
import { useLocation } from 'react-router-dom';
import iconfind from '../../../images/icon-find.svg';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm(props) {
  const location = useLocation();

  const searchClasses = `search ${
    location.pathname === '/saved-movies' ? 'saved-movies' : 'movies'
  }`;

  return (
    <section className={searchClasses}>
      <form className='search__form' noValidate onSubmit={props.handleSubmit}>
        <div className='search__form-container'>
          <input
            type='text'
            className='search__input'
            placeholder='Фильм'
            value={props.searchText}
            onChange={props.handleInputChange}
          />
          <button
            type='submit'
            className='search__button'
            aria-label='Кнопка поиска фильма'
          >
            <img src={iconfind} alt='Поиск' />
          </button>
        </div>
        {props.isSearchTextEmpty ? (
          <span className='error'>Нужно ввести ключевое слово</span>
        ) : (
          <></>
        )}
      </form>
      <FilterCheckbox
        checkboxHandler={props.checkboxHandler}
        checkboxValue={props.checkboxValue}
      />
      <div className='search__line'>{props.errorSearchMessage}</div>
    </section>
  );
}

export default SearchForm;
