import styles from './header.module.css' 

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useMatch } from 'react-router-dom';

const Header = () => {
  
  const matchProfile = useMatch('/profile');
  const matchOrders = useMatch('/profile/orders');
  const matchConstructor = useMatch('/');

  return(
    <header className={styles.header}>
      <div className={styles.block}>
        <div className={`${styles.column} ${styles.column_left}`}>
          <Link to='/' className={`${styles.link} ${matchConstructor ? styles.link_active : ''}`}>
            <div className={`${styles.button} pr-5 pt-4 pb-4 mt-4 mb-4 mr-2`}>
              <BurgerIcon type={matchConstructor ? 'primary' : 'secondary'} />
              <p className={`text ${matchConstructor ? '' : 'text_color_inactive'} text_type_main-default ml-2`}>Конструктор</p>
            </div>
          </Link>
          <Link to='/profile/orders' className={`${styles.link} ${matchOrders ? styles.link_active : ''}`}>
            <div className={`${styles.button} pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`}>
              <ListIcon type={matchOrders ? 'primary' : 'secondary'} />
              <p className={`text text_type_main-default ${matchOrders ? '' : 'text_color_inactive'} ml-2`}>Лист заказов</p>
            </div>
          </Link>
        </div>
        <div className='logo'>
          <Logo />
        </div>
        <div className={`${styles.column} ${styles.column_right}`}>
          <Link to='/profile' className={`${styles.link} ${matchProfile ? styles.link_active : ''}`}>
            <div className={`${styles.button} pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`}>
              <ProfileIcon type={matchProfile ? 'primary' : 'secondary'} />
              <p className={`text text_type_main-default ${matchProfile ? '' : 'text_color_inactive'} ml-2`}>Личный кабинет</p>
            </div>  
          </Link>
        </div>
      </div>
    </header>
  )
};

export default Header;