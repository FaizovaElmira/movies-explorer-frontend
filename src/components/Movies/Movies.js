import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <section className='movies' aria-label='Фильмы'>
      <SearchForm />
      {props.isLoading ? <Preloader /> : null}
      <MoviesCardList />
    </section>
  );
}

export default Movies;
