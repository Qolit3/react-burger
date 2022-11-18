import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import styles from './resetPass.module.css'
import { useState, useRef, useEffect } from 'react'
import { api } from '../../util/constants'

export const ResetPass = () => {
  const [loading, setLoading] = useState(false);
  const [errorLoad, setErrorLoad] = useState(false);
  const [pass, setPass] = useState('');
  const passRef = useRef(null);
  const [code, setCode] = useState('');
  const codeRef = useRef(null);

  const { search } = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!search) {
      console.log(1);
      navigate({ pathname: '/forgot-password' })
    }   
    
  },[])

  const onResetClick = async () => {
    setLoading(true);
    return await fetch(`${api}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": pass,
        "token": code
      })
    })
    .then(res => {
      if(res && res.ok) {
        return (res.json())
      } else {
        setErrorLoad(true);
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .then(res => {
      if(res.success) {
        setLoading(false);
        <Navigate to='/login' />
      }
    })
    .catch(res => {
      setErrorLoad(true);
      console.log(`Ошибка: ${res.status}`)
    })
  }


  if(loading) {
    return (<h2 className={`${styles.text} text text_type_main-default`}>Загрзука</h2>)
  } else if(errorLoad) {
    return (<h2 className={`${styles.text} text text_type_main-default`}>Ошибка загрузки</h2>)
  } else {
    return (
      <div className={styles.main}>
        <h2 className={`${styles.text} text text_type_main-default`}>Восстановление пароля</h2>
        <form name="reset-form"  noValidate>
          <div className={`${styles.center_box} mt-6`}>
            <Input
              type={'password'}
              placeholder={'Введите новый пароль'}
              onChange={e => setPass(e.target.value)}
              icon={'ShowIcon'}
              value={pass}
              name={'passInput'}
              error={false}
              ref={passRef}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <div className={`${styles.center_box} mt-6 mb-6`}>
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={e => setCode(e.target.value)}
              icon={undefined}
              value={code}
              name={'codeInput'}
              error={false}
              ref={codeRef}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <div className={styles.center_box}>
            <Button type='primary' size='small' onClick={onResetClick} htmlType='submit'>Сохранить</Button>
          </div>
        </form>
        <div className={`${styles.center_box} mt-20`}>
          <p className={`text text_type_main-default text_color_inactive mr-2`}>Вспомнили пароль?</p>
          <Link to='/login'>Войти</Link>
        </div>
      </div>
  )
  }
}