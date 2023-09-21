import { useEffect, useState } from 'react';
import useValidation from '../../hooks/useValidation';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';

function Login(props) {
  const { values, errors, handleChange, isValid } = useValidation();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    const { email, password } = values;
    e.preventDefault();
    
    // Обнулить состояния перед отправкой запроса
    setIsLoading(true);
    props.setAuthError('');

    props.handleLogin(email, password)
      .finally(() => {
        // Разблокировать форму после завершения запроса (успешного или неудачного)
        setIsLoading(false);
      });
  }

  useEffect(() => {
    props.setAuthError('');
  }, []);

  return (
    <section className='login' aria-label='Вход на сайт'>
      <AuthForm
        title={'Рады видеть!'}
        textBtn={'Войти'}
        link='/signup'
        textLink='Регистрация'
        subtitle='Еще не зарегистрированы?'
        onSubmit={handleSubmit}
        isValid={isValid}
      >
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
          <span className='loading'>Идет вход...</span>
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

export default Login;


