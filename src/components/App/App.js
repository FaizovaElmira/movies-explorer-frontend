import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Auth/Profile/Profile";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import NotFound from "../NotFound/NotFound";
import "./App.css";
import moviesData from '../../utils/movies';

function App() {
  const [savedMovies, setSavedMovies] = useState([]);

  // Фильтруем фильмы, чтобы получить список сохраненных фильмов
  useEffect(() => {
    const savedMoviesList = moviesData.filter((movie) => movie.saved);
    setSavedMovies(savedMoviesList);
  }, []);

  return (
    <div className="page">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies savedMovies={savedMovies} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
