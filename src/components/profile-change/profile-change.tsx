import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, useRef, FunctionComponent } from 'react';
import { useForm } from '../../hooks/useForm';
import { accessToken, api } from "../../util/constants";
import { checkResponse } from '../../util/functions';
import styles from './profile-change.module.css'


export const ProfileChange: FunctionComponent = () => {
  const [isPatched, setIsPatched] = useState<boolean>(false);
  
  useEffect(() => {
    fetch(`${api}/auth/user`, {
      method: "GET",
      headers: {
        'authorization': `Bearer ${accessToken}`
      }
    })
    .then(checkResponse)
    .then(res => {
      if(res.success) {
        setValues({
          ...values,
          name: res.user.name,
          email: res.user.email
        })
        setEditedName(res.user.name);
        setEditedEmail(res.user.email);
        setIsPatched(false);
      } else {
        console.log(`Ошибка: ${res}`)
      }
    })
    .catch(res => {
      console.log(`Ошибка: ${res}`)
    })
  }, [isPatched])

  const patchUser = async (): Promise<Promise<any>> => {
    let updateBody: {
      name: string;
      email: string;
      password?: string;
    } = {
      'name': values.name,
      'email': values.email
    };
    if(values.pass) {
      updateBody.password = values.pass
    }    
    await fetch(`${api}/auth/user`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(updateBody)
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        console.log('Данные изменились');
        setIsPatched(true);
        setNameEdit(true);
        setEmailEdit(true);
        setPassEdit(true);
      } else {
        console.log(`Ошибка: ${res}`)
      }
    })
    .catch(res => console.log(`Ошибка: ${res}`));
  }

  const {values, handleChange, setValues} = useForm({
    name: '',
    email: '',
    pass: ''
  })

  const passRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [nameEdit, setNameEdit] = useState<boolean>(true);
  const [emailEdit, setEmailEdit] = useState<boolean>(true);
  const [passEdit, setPassEdit] = useState<boolean>(true);

  const [editedName, setEditedName] = useState<string>();
  const [editedEmail, setEditedEmail] = useState<string>();

  const [needSafe, setNeedSafe] = useState<boolean>(false)
  const result: boolean = ((editedName === values.name) && (editedEmail === values.email) && (values.pass === ''))
  useEffect(() => {
    setNeedSafe(!result);
  }, [result])

  const onNameIconClick = () => {
    setNameEdit(!nameEdit);
  }
  const onEmailIconClick = () => {
    setEmailEdit(!emailEdit)
  }
  const onPassIconClick = () => {
    setPassEdit(!passEdit)
  }

  return(
    <>
    <div >
        <Input
          type="text"
          placeholder="Имя"
          onChange={e => handleChange(e)}
          icon='EditIcon'
          value={values.name}
          disabled={nameEdit}
          error={false}
          ref={nameRef}
          errorText='Error'
          size="default"
          onIconClick={onNameIconClick}
        />
        <div className="mt-6 mb-6">
          <Input
            type="email"
            placeholder="E-mail"
            onChange={e => handleChange(e)}
            icon='EditIcon'
            disabled={emailEdit}
            value={values.email}
            error={false}
            ref={emailRef}
            errorText='Error'
            size="default"
            onIconClick={onEmailIconClick}
          />
        </div>
        <Input
          type="password"
          placeholder="Пароль"
          onChange={e => handleChange(e)}
          icon='EditIcon'
          disabled={passEdit}
          value={values.pass}
          error={false}
          ref={passRef}
          errorText='Error'
          size="default"
          onIconClick={onPassIconClick}
        />
      </div>
      <div className={`${styles.center} mt-6`}>
        { needSafe &&
          <Button htmlType="button" type="primary" size="medium" onClick={patchUser}>
            Сохранить данные
          </Button>
        }
      </div>
      </>
  )

}