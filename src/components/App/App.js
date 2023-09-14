import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation  } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../context/CurrentUserContext";
import * as auth from "../../utils/auth";
import moviesData from "../../utils/movies";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);
  const [shouldHideHeaderFooter, setShouldHideHeaderFooter] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate(location.pathname);
            setEmail(res.data.email); 
            localStorage.setItem('jwt', token); // Сохранить токен в локальном хранилище
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate, location.pathname]);

  // Фильтруем фильмы, чтобы получить список сохраненных фильмов
  useEffect(() => {
    const savedMoviesList = moviesData.filter((movie) => movie.saved);
    setSavedMovies(savedMoviesList);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
          {!shouldHideHeaderFooter && <Header />}
          <Routes>
            <Route path="/" element={<Main loggedIn={loggedIn} />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute>
                  <Movies loggedIn={loggedIn} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute>
                  <SavedMovies loggedIn={loggedIn} savedMovies={savedMovies} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile loggedIn={loggedIn} />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route
              path="*"
              element={
                <NotFound
                  onSetShouldHideHeaderFooter={setShouldHideHeaderFooter}
                />
              }
            />
          </Routes>
          {!shouldHideHeaderFooter && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;




