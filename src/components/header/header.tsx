import React from 'react';
import './header.css'

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const Header = () => {
  
    return(
      <header className='header'>
        <div className='header__block'>
          <div className='header__first-column'>
            <div className='header__button-box pr-5 pt-4 pb-4 mt-4 mb-4 mr-2'>
              <BurgerIcon type='primary' />
              <p className='text text_type_main-default ml-2'>Конструктор</p>
            </div>
            <div className='header__button-box pl-5 pr-5 pt-4 pb-4 mt-4 mb-4'>
              <ListIcon type='secondary' />
              <p className='text text_type_main-default text_color_inactive ml-2'>Лист заказов</p>
            </div>
          </div>
          <div className='header__logo'>
            <Logo />
          </div>
          <div className='header__second-column'>
            <div className='header__button-box pl-5 pt-4 pb-4 mt-4 mb-4'>
              <ProfileIcon type='secondary' />
              <p className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</p>
            </div>  
          </div>
        </div>
      </header>
    )
  
};

export default Header;