import { useEffect } from 'react';
import useValidation from '../../hooks/useValidation';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';

function Login(props) {
  const { values, errors, handleChange, isValid } = useValidation();

  function handleSubmit(e) {
    const { email, password } = values;
    e.preventDefault();
    props.handleLogin(email, password);
  }

  useEffect(() => {
    props.setAuthError('');
  }, [props]);
  
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
        {props.authError ? (
          <span className='error'>{props.authError}</span>
        ) : (
          <></>
        )}
      </AuthForm>
    </section>
  );
}

export default Login;
