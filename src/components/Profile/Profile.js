import "./Profile.css";
import useValidation from "../../hooks/useValidation";
import { useState, useRef } from "react";

function Profile(props) {
  const { values, errors, handleChange } = useValidation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNeedDisable, setIsNeedDisable] = useState(false);
  const nameInputRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditMode(false);
    setIsNeedDisable(false);
  }

  function handleEditMode() {
    setIsEditMode(true);
  }

  function handleInputChange(e) {
    handleChange(e);
    setIsNeedDisable(true);
  }

  return (
    <section
      className="profile"
      aria-label="Редактирование профиля пользователя"
    >
      <div className="profile__container">
        <h1 className="profile__title">
          {`Привет ${
            nameInputRef.current ? nameInputRef.current.value : "Виталий"
          }!`}
        </h1>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-form__container">
            <label htmlFor="name" className="profile-form__label">
              Имя
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="profile-form__input"
              required
              minLength={2}
              maxLength={40}
              value={values.name || "Виталий"}
              onChange={handleInputChange}
              placeholder="Введите имя"
              readOnly={!isEditMode}
              ref={nameInputRef}
            />
          </div>
          <span className="error error_type_profile">{errors.name || ""}</span>
          <div className="profile__line"></div>
          <div className="profile-form__container">
            <label htmlFor="email" className="profile-form__label">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="profile-form__input"
              required
              value={values.email || "pochta@yandex.ru"}
              onChange={handleInputChange}
              placeholder="Введите e-mail"
              readOnly={!isEditMode}
            />
          </div>
          <span className="error error_type_profile">{errors.email || ""}</span>
          {isEditMode ? (
            <button
              className={`profile__btn profile__btn_type_change ${
                isNeedDisable ? "active" : "disabled"
              }`}
              type="submit"
              aria-label="Кнопка Сохранить"
              disabled={!isNeedDisable}
            >
              Сохранить
            </button>
          ) : (
            <>
              <button
                className="profile__btn profile__btn_type_submit hover-button"
                aria-label="Кнопка редактирования"
                type="button"
                onClick={handleEditMode}
              >
                Редактировать
              </button>
              <button
                className="profile__btn profile__btn_type_exit"
                type="button"
                aria-label="Выйти из аккаунта"
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
