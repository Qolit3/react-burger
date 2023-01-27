import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import styles from './resetPass.module.css'
import { useState, useRef, useEffect, FC } from 'react'
import { api } from '../../util/constants'
import { useForm } from "../../hooks/useForm"
import { checkResponse } from "../../util/functions"

export const ResetPass: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorLoad, setErrorLoad] = useState<boolean>(false);
  
  const passRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  const {values, handleChange, setValues} = useForm({
    pass: '',
    code: ''
  })

  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if(state !== '/forgot-password') {
      navigate('/forgot-password')
    }    
  }, [])


  const onResetClick = async () => {
    setLoading(true);
    
    return await fetch(`${api}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": values.pass,
        "token": values.code
      })
    })
    .then(checkResponse)
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
              onChange={e => handleChange(e)}
              icon={'ShowIcon'}
              value={values.pass}
              name={'pass'}
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
              onChange={e => handleChange(e)}
              icon={undefined}
              value={values.code}
              name={'code'}
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