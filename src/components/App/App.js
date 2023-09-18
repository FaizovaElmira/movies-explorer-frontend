import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/auth';
import api from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { AppContext } from '../../contexts/AppContext';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFirstCheckToken, setIsFirstCheckToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const location = useLocation();
  // список фильмов из api
  const [moviesFromApi, setMoviesFromApi] = useState(
    JSON.parse(localStorage.getItem('moviesFromApi')) || []
  );
  // список фильмов по поиску
  const [moviesFromSearch, setMoviesFromSearch] = useState(
    JSON.parse(localStorage.getItem('moviesFromSearch')) || []
  );
  // сохраненные фильмы из базы данных
  const [savedMovies, setSavedMovies] = useState([]);
  const [shouldHideHeaderFooter, setShouldHideHeaderFooter] = useState(false);
  // ошибка при авторизации
  const [authError, setAuthError] = useState('');
  // текст поиска на странице movies
  const [searchMovieText, setSearchMovieText] = useState(
    localStorage.getItem('searchMovieText') || ''
  );
  // чекбокс короткометражек на странице movies
  const [isFilterCheckboxOn, setIsFilterCheckboxOn] = useState(
    JSON.parse(localStorage.getItem('isFilterCheckboxOn')) || false
  );
  // сообщение об ошибке при поиске
  const [errorSearchMessage, setErrorSearchMessage] = useState('');

  const navigate = useNavigate();

  // переключение лайка фильма
  const toggleSaveCard = (card, savedCard) => {
    if (!savedCard) {
      api
        .addMovie(card)
        .then((newSavedCard) => {
          const updatedSavedMovies = [newSavedCard, ...savedMovies];
          setSavedMovies(updatedSavedMovies);
        })
        .catch((error) => console.log(`addMovie: ${error}`));
    } else {
      api
        .deleteMovie(savedCard._id)
        .then(() => {
          const updatedSavedMovies = savedMovies.filter(
            (movie) => movie._id !== savedCard._id
          );
          setSavedMovies(updatedSavedMovies);
        })
        .catch((error) => console.log(`deleteMovie: ${error}`));
    }
  };

  // Авторизация
  const handleLogin = async (email, password) => {
    try {
      const data = await auth.authorize(email, password);

      localStorage.setItem('token', data.token);
      setCurrentUser({
        ...currentUser,
        name: data.user.name,
        email: data.user.email,
      });
      setIsFirstCheckToken(true);
      setAuthError('');
    } catch (error) {
      console.log(`login: ${error}`);
      setAuthError('Неправильный логин или пароль');
    }
  };

  // Регистрация
  const handleRegister = (name, email, password) => {
    auth
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((error) => {
        console.log(`register: ${error}`);
        setAuthError('Неверный логин или пароль');
      });
  };

  // проверка токена
  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          setCurrentUser({
            name: data.name,
            email: data.email,
            _id: data._id,
          });
        })
        .then(() => {
          setLoggedIn(true);
          if (isFirstCheckToken) {
            navigate('/movies');
            setIsFirstCheckToken(false);
          } else {
            navigate(location.pathname);
          }
        })
        .catch((error) => console.log(`checkToken: ${error}`));
    }
  };

  // получение списка фильмов от Api
  useEffect(() => {
    if (loggedIn && !localStorage.getItem('moviesFromApi')) {
      moviesApi
        .getAllMovies()
        .then((res) => {
          localStorage.setItem('moviesFromApi', JSON.stringify(res));
          setMoviesFromApi(res);
        })
        .catch((error) => console.log(`getAllMovies: ${error}`));
    }
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstCheckToken]);

  // запрос к Api на сохраненные фильмы
  useEffect(() => {
    if (loggedIn) {
      api
        .getSavedMovies()
        .then((data) => {
          setSavedMovies(data);
        })
        .catch((error) => {
          console.log(`getSavedMovies: ${error}`);
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <AppContext.Provider value={{ savedMovies, toggleSaveCard }}>
        <div className='page'>
          {!shouldHideHeaderFooter && <Header loggedIn={loggedIn} />}
          <Routes>
            <Route path='/' element={<Main />} />
            <Route
              path='/movies'
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Movies
                    moviesFromSearch={moviesFromSearch}
                    setMoviesFromSearch={setMoviesFromSearch}
                    isLoading={isLoading}
                    searchMovieText={searchMovieText}
                    moviesFromApi={moviesFromApi}
                    isFilterCheckboxOn={isFilterCheckboxOn}
                    setSearchMovieText={setSearchMovieText}
                    setIsLoading={setIsLoading}
                    errorSearchMessage={errorSearchMessage}
                    setErrorSearchMessage={setErrorSearchMessage}
                    setIsFilterCheckboxOn={setIsFilterCheckboxOn}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <SavedMovies
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                    setLoggedIn={setLoggedIn}
                    setSearchMovieText={setSearchMovieText}
                    setMoviesFromApi={setMoviesFromApi}
                    setSavedMovies={setSavedMovies}
                    setMoviesFromSearch={setMoviesFromSearch}
                  />
                </ProtectedRoute>
              }
            />
            {!loggedIn && (
              <Route
                path='/signup'
                element={
                  <Register
                    handleRegister={handleRegister}
                    authError={authError}
                    setAuthError={setAuthError}
                  />
                }
              />
            )}
            {!loggedIn && (
              <Route
                path='/signin'
                element={
                  <Login
                    handleLogin={handleLogin}
                    authError={authError}
                    setAuthError={setAuthError}
                  />
                }
              />
            )}
            <Route
              path='*'
              element={
                <NotFound
                  onSetShouldHideHeaderFooter={setShouldHideHeaderFooter}
                />
              }
            />
          </Routes>
          {!shouldHideHeaderFooter && <Footer />}
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

