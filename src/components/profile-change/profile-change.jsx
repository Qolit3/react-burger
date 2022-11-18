import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, useRef } from 'react';
import { accessToken, api } from "../../util/constants";
import styles from './profile-change.module.css'


export const ProfileChange = () => {
  const [isPatched, setIsPatched] = useState(false);
  
  useEffect(() => {
    fetch(`${api}/auth/user`, {
      method: "GET",
      headers: {
        'authorization': `Bearer ${accessToken}`
      }
    })
    .then(res => res.json())
    .then(res => {
      if(res.success) {
        setName(res.user.name);
        setEditedName(res.user.name);
        setEmail(res.user.email);
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

  const patchUser = async () => {
    let updateBody = {
      'name': name,
      'email': email
    };
    if(pass) {
      updateBody.password = pass
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const passRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const [nameEdit, setNameEdit] = useState(true);
  const [emailEdit, setEmailEdit] = useState(true);
  const [passEdit, setPassEdit] = useState(true);

  const [editedName, setEditedName] = useState();
  const [editedEmail, setEditedEmail] = useState();

  const [needSafe, setNeedSafe] = useState(false)
  const result = ((editedName === name) && (editedEmail === email) && (pass === ''))
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
          onChange={e => setName(e.target.value)}
          icon='EditIcon'
          value={name}
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
            onChange={e => setEmail(e.target.value)}
            icon='EditIcon'
            disabled={emailEdit}
            value={email}
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
          onChange={e => setPass(e.target.value)}
          icon='EditIcon'
          disabled={passEdit}
          value={pass}
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