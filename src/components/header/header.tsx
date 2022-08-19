import styles from './header.module.css' 

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const Header = () => {
  
    return(
      <header className={styles.header}>
        <div className={styles.block}>
        <div className={`${styles.column} ${styles.column_left}`}>
            <div className={`${styles.button} pr-5 pt-4 pb-4 mt-4 mb-4 mr-2`}>
              <BurgerIcon type='primary' />
              <p className='text text_type_main-default ml-2'>Конструктор</p>
            </div>
            <div className={`${styles.button} pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`}>
              <ListIcon type='secondary' />
              <p className='text text_type_main-default text_color_inactive ml-2'>Лист заказов</p>
            </div>
          </div>
          <div className='logo'>
            <Logo />
          </div>
          <div className={`${styles.column} ${styles.column_right}`}>
            <div className={`${styles.button} pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`}>
              <ProfileIcon type='secondary' />
              <p className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</p>
            </div>  
          </div>
        </div>
      </header>
    )
  
};

export default Header;