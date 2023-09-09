import "./Profile.css";
import useValidation from "../../hooks/useValidation";
import { useState, useEffect } from "react";

function Profile(props) {
  const { values, errors, handleChange } = useValidation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsDirty(false);
  }, [values]); // Сброс isDirty при изменении значений полей

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditMode(false);
  }

  function handleEditMode() {
    setIsEditMode(true);
  }

  function handleInputChange(e) {
    handleChange(e);
    setIsDirty(true);
  }

  return (
    <main className="profile">
      <div className="profile__container">
        <h2 className="profile__title">{`Привет Виталий!`}</h2>
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
              required=""
              minLength={2}
              maxLength={40}
              value={values.name || "Виталий"}
              onChange={handleInputChange}
              placeholder="Введите имя"
              readOnly={!isEditMode}
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
              required=""
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
                isDirty ? "active" : "disabled"
              }`}
              type="submit"
              aria-label="Сохранить изменения"
            >
              Сохранить
            </button>
          ) : (
            <>
              <button
                className="profile__btn profile__btn_type_submit hover-button"
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
    </main>
  );
}

export default Profile;

