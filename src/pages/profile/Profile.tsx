import { FunctionComponent } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { api, refreshToken } from "../../util/constants";
import { deleteCookie } from "../../util/functions";
import styles from './profile.module.css'

export const Profile: FunctionComponent = () => {  
  let description: string = '';
  const navigate = useNavigate();

  const passiveStyle: string = `${styles.button} text text_type_main-medium`
  const activeStyle: string = passiveStyle + ` ${styles.button_active}`;

  const logout = async (): Promise<void> => {
    await fetch(`${api}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": refreshToken
      })
    })
    .then(res => res.json())
    .then(res => {
      if(res.success) {
        console.log('Выход выполнен успешно')
        deleteCookie('refreshToken');
        deleteCookie('accessToke')
        navigate('/login')
      } else {
        console.log(`Ошибка: ${res}`)
      }
    })
    .catch(res => console.log(`Ошибка: ${res}`))
  }

  return(
    <div className={styles.main}>
      <div className={styles.side_bar}>
        <NavLink to='/profile' end={true} className={({ isActive }) => isActive ? activeStyle : passiveStyle}>
          Профиль
        </NavLink>
        <NavLink to='/profile/orders' className={({isActive}) => isActive ? `${activeStyle} mt-6 mb-6`: `${passiveStyle} mt-6 mb-6`}>
            История заказов
        </NavLink>
        <button onClick={logout} className={`${styles.button} ${styles.button_exit} text_color_inactive text text_type_main-medium`}>Выход</button>
        <p>{description}</p>
      </div>
      <Outlet />
    </div>
  )
}