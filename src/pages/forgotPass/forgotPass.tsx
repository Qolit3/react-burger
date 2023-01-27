import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate } from "react-router-dom"
import styles from './forgotPass.module.css'
import { useState, useRef, FunctionComponent } from 'react'
import { api } from '../../util/constants'
import { checkResponse } from "../../util/functions"


export const ForgotPass: FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorLoad, setErrorLoad] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onForgotClick = async (): Promise<void> => {
    setLoading(true);
    return await fetch(`${api}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email
      })
    })
    .then(checkResponse)
    .then(res => {
      if(res.success) {
        setLoading(false);
        navigate('/reset-password', {state: '/forgot-password'})
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
        <form name="forgot-form"  noValidate>
          <div className={`${styles.center_box} mt-6 mb-6`}>
            <Input
              type={'email'}
              placeholder={'Укажите e-mail'}
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
          <div className={styles.center_box}>
            <Button type='primary' size='small' onClick={onForgotClick} htmlType='submit'>Восстановить</Button>
          </div>
        </form>
        <div className={`${styles.center_box} mt-20`}>
          <p className={`text text_type_main-default text_color_inactive mr-2`}>Вспомнили пароль?</p>
          <Link to='/login'>Войти</Link>
        </div>
      </div>
  )}
}

