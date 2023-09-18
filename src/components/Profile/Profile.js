import './Profile.css';
import useValidation from '../../hooks/useValidation';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../../utils/auth';

function Profile(props) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { values, errors, handleChange, setValues } = useValidation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNeedDisable, setIsNeedDisable] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    updateUserInfo({
      name: values.name,
      email: values.email,
    })
      .then((res) => {
        setCurrentUser({
          name: res.data.name,
          email: res.data.email,
        });
        setSuccessMessage('Сохранено');
      })
      .catch((error) => {
        setErrorMessage('Неудалось сохранить изменения');
        console.log(`updateUserInfo: ${error}`);
      });
    setIsEditMode(false);
    setIsNeedDisable(false);
  }

  function handleEditMode() {
    setIsEditMode(true);
  }

  function handleInputChange(e) {
    handleChange(e);
    if (e.target.value === currentUser[e.target.name]) {
      setIsNeedDisable(false);
    } else {
      setIsNeedDisable(true);
    }
  }

  const handleExit = () => {
    props.setLoggedIn(false);
    localStorage.clear();
    props.setSearchMovieText('');
    props.setMoviesFromApi([]);
    props.setSavedMovies([]);
    props.setMoviesFromSearch([]);
    setCurrentUser({
      name: '',
      email: '',
      _id: '',
    });
    navigate('/');
  };

  useEffect(() => {
    setSuccessMessage('');
    setErrorMessage('');
  }, []);

  return (
    <section
      className='profile'
      aria-label='Редактирование профиля пользователя'
    >
      <div className='profile__container'>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
        <form className='profile-form' onSubmit={handleSubmit}>
          <div className='profile-form__container'>
            <label htmlFor='name' className='profile-form__label'>
              Имя
            </label>
            <input
              id='name'
              type='text'
              name='name'
              className='profile-form__input'
              required
              minLength={2}
              maxLength={40}
              value={values.name || ''}
              onChange={handleInputChange}
              placeholder='Введите имя'
              readOnly={!isEditMode}
            />
          </div>
          <span className='error error_type_profile'>{errors.name || ''}</span>
          <div className='profile__line'></div>
          <div className='profile-form__container'>
            <label htmlFor='email' className='profile-form__label'>
              E-mail
            </label>
            <input
              id='email'
              type='email'
              name='email'
              className='profile-form__input'
              required
              value={values.email || ''}
              onChange={handleInputChange}
              placeholder='Введите e-mail'
              readOnly={!isEditMode}
            />
          </div>
          <span className='error error_type_profile'>{errors.email || ''}</span>
          {errorMessage && (
            <span className='error profile__error-message'>{errorMessage}</span>
          )}
          {successMessage && (
            <span className='profile__success-message'>{successMessage}</span>
          )}
          {isEditMode ? (
            <button
              className={`profile__btn profile__btn_type_change ${
                isNeedDisable ? 'active' : 'disabled'
              }`}
              type='submit'
              aria-label='Кнопка Сохранить'
              disabled={!isNeedDisable}
            >
              Сохранить
            </button>
          ) : (
            <>
              <button
                className='profile__btn profile__btn_type_submit hover-button'
                aria-label='Кнопка редактирования'
                type='button'
                onClick={handleEditMode}
              >
                Редактировать
              </button>
              <button
                className='profile__btn profile__btn_type_exit'
                type='button'
                aria-label='Выйти из аккаунта'
                onClick={handleExit}
              >
                Выйти из аккаунта
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

export default Profile;
