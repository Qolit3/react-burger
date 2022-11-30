import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react'
import styles from './login.module.css'
import { useNavigate, Link, useLocation, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/actions/loginAction';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { request, fail } = useSelector(state => ({
    request: state.login.loginRequest,
    fail: state.login.loginFail
  }))

  const [email, setEmail] = useState('');
  const emailRef = React.useRef(null);
  const [pass, setPass] = useState('');
  const passRef = React.useRef(null);

  const onIconClick = () => {
    setTimeout(() => emailRef.current.focus(), 0);
    alert('email click')
  }

  const onLoginClick = () => {
    dispatch(login(email, pass));
    if(!request && !fail) {
      console.log(location);
      return <Navigate to={location.state} />
    }    
  }

  return (
    <div className={styles.main}>
      <h2 className={`${styles.text} text text_type_main-normal`}>Вход</h2>
      <form name="login-form" noValidate>
        <div className={`${styles.center_box} mt-6`}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={e => setEmail(e.target.value)}
            icon={undefined}
            value={email}
            name={'emailInput'}
            error={false}
            ref={emailRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={`${styles.center_box} mt-6 mb-6`}>
          <Input
            type={'password'}
            placeholder={'Password'}
            onChange={e => setPass(e.target.value)}
            icon={'ShowIcon'}
            value={pass}
            name={'passInput'}
            error={false}
            ref={passRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={styles.center_box}>
          <Button type='primary' size='small' onClick={onLoginClick} htmlType='submit'>Войти</Button>
        </div>
      </form>
      <div className={`${styles.center_box} mt-20`}>
        <p className={`text text_type_main-default text_color_inactive mr-2`}>Вы — новый пользователь?</p>
        <Link to='/register'>Зарегестрироваться</Link>
      </div>
      <div className={`${styles.center_box} mt-4`}>
        <p className={`text text_type_main-default text_color_inactive mr-2`}>Забыли пароль?</p>
        <Link to='/forgot-password'>Восстановить пароль</Link>
      </div>
    </div>
  )
}