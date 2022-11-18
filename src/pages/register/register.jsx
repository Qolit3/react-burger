import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react'
import styles from '../login/login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../services/actions/registrationAction';


export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request, fail } = useSelector(state => ({
    request: state.registration.registrationRequest,
    fail: state.registration.registrationFailed
  }))

  const [name, setName] = useState('');
  const nameRef = React.useRef(null);
  const [email, setEmail] = useState('');
  const emailRef = React.useRef(null);
  const [pass, setPass] = useState('');
  const passRef = React.useRef(null);

  const onRegisterClick =  () => {
    dispatch(registration(name, email, pass));
    if(!request && !fail) {
      navigate({ pathname: '/' })
    }    
  }

  if(request) {
    return (<h2 className={`${styles.text} text text_type_main-default`}>Загрзука</h2>)
  } else if(fail) {
    return (<h2 className={`${styles.text} text text_type_main-default`}>Ошибка загрузки</h2>)
  } else {
    return (
      <div className={styles.main}>
        <h2 className={`${styles.text} text text_type_main-normal`}>Регистрация</h2>
        <form name="login-form" className={styles.form} noValidate>
          <div className={`${styles.center_box} mt-6`}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={e => setName(e.target.value)}
              icon={undefined}
              value={name}
              name={'nameInput'}
              error={false}
              ref={nameRef}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <div className={`${styles.center_box} mt-6`}>
            <Input 
              type='email'
              placeholder='E-mail'
              onChange={e => setEmail(e.target.value)}
              icon={undefined}
              value={email}
              name={'emailInput'}
              error={false}
              ref={emailRef}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <div className={`${styles.center_box} mt-6`}>
            <Input
              type='password'
              placeholder='Password'
              onChange={e => setPass(e.target.value)}
              icon={'HideIcon'}
              value={pass}
              name={'passInput'}
              error={false}
              ref={passRef}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <div className={`${styles.center_box} mt-6`}>
          <Button type='primary' size='small' onClick={onRegisterClick} htmlType='button'>Зарегестрироваться</Button>
          </div>
        </form>
        <div className={`${styles.center_box} mt-20`}>
          <p className={`text text_type_main-default text_color_inactive mr-2`}>Уже зарегистрированы?</p>
          <Link to='/login'>Войти</Link>
        </div>
      </div>
    )
  }
}