import { useEffect, useState } from 'react';
import useValidation from '../../hooks/useValidation';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';

function Register(props) {
  const { values, errors, handleChange, isValid } = useValidation();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = values;

    // Обнулить состояния перед отправкой запроса
    setIsLoading(true);
    props.setAuthError('');

    props.handleRegister(name, email, password)
      .finally(() => {
        // Разблокировать форму после завершения запроса (успешного или неудачного)
        setIsLoading(false);
      });
  }

  useEffect(() => {
    props.setAuthError('');
  }, []);

  return (
    <section className='register' aria-label='Регистрация на сайте'>
      <AuthForm
        title={'Добро пожаловать!'}
        textBtn={'Зарегистрироваться'}
        link='/signin'
        textLink='Войти'
        subtitle='Уже зарегистрированы?'
        onSubmit={handleSubmit}
        isValid={isValid}
      >
        <Input
          id='name'
          title='Имя'
          name='name'
          type='text'
          required
          minLength={2}
          maxLength={40}
          value={values.name || ''}
          onChange={handleChange}
          errors={errors.name}
          placeholder='Введите имя'
        />
        <Input
          id='email'
          title='E-mail'
          name='email'
          type='email'
          required
          value={values.email || ''}
          onChange={handleChange}
          errors={errors.email}
          placeholder='Введите e-mail'
        />
        <Input
          id='password'
          title='Пароль'
          name='password'
          type='password'
          required
          minLength='8'
          value={values.password || ''}
          onChange={handleChange}
          errors={errors.password}
          placeholder='Введите пароль'
        />
        {isLoading ? (
          <span className='loading'>Идет регистрация...</span>
        ) : (
          props.authError ? (
            <span className='error'>{props.authError}</span>
          ) : (
            <></>
          )
        )}
      </AuthForm>
    </section>
  );
}

export default Register;


