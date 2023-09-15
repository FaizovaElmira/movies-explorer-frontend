import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFirstCheckToken, setIsFirstCheckToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const location = useLocation();
  const [savedMovies, setSavedMovies] = useState([]);
  const [shouldHideHeaderFooter, setShouldHideHeaderFooter] = useState(false);
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();

  // Авторизация
  const handleLogin = async (email, password) => {
    try {
      const data = await auth.authorize(email, password);

      localStorage.setItem("token", data.token);
      setCurrentUser({
        ...currentUser,
        name: data.user.name,
        email: data.user.email,
      });
      setIsFirstCheckToken(true);
      setAuthError("");
    } catch (error) {
      console.log(`login`, error);
      setAuthError("Неправильный логин или пароль");
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
        console.log("register ", error);
        setAuthError("Неверный логин или пароль");
      });
  };

  const checkToken = () => {
    const token = localStorage.getItem("token");
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
            navigate("/movies");
            setIsFirstCheckToken(false);
          } else {
            navigate(location.pathname);
          }
        })
        .catch((error) => console.log(`checkToken:`, error));
    }
  };

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstCheckToken]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {!shouldHideHeaderFooter && <Header />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies isLoading={isLoading} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies savedMovies={savedMovies} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile />
              </ProtectedRoute>
            }
          />
          {!loggedIn && (
            <Route
              path="/signup"
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
              path="/signin"
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
