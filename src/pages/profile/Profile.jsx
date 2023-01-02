import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { loginFail } from "../../services/actions/actionCreators";
import { FAILED_AUTHORIZATION } from "../../services/actions/userAction";
import { api } from "../../util/constants";
import { deleteCookie, getCookie } from "../../util/functions";
import styles from './profile.module.css'

export const Profile = () => {  
  let description = '';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passiveStyle = `${styles.button} text text_type_main-medium`
  const activeStyle = passiveStyle + ` ${styles.button_active}`;

  const logout = async () => {
    await fetch(`${api}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": getCookie('refreshToken')
      })
    })
    .then(res => res.json())
    .then(res => {
      if(res.success) {
        console.log('Выход выполнен успешно')
        dispatch({type: FAILED_AUTHORIZATION})
        dispatch(loginFail())
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