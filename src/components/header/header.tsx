import React from 'react';
import './header.css'

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

class Header extends React.Component {
  render() {
    return(
      <header className='header'>
        <div className='header__first-column'>
          <div className='header__button-box p-5 mt-4 mb-4 mr-2'>
            <BurgerIcon type='primary' />
            <p className='text ml-2'>Конструктор</p>
          </div>
          <div className='header__button-box p-5 mt-4 mb-4'>
            <ListIcon type='secondary' />
            <p className='text ml-2'>Лист заказов</p>
          </div>
        </div>
        <Logo />
        <div className='header__button-box p-5 mt-4 mb-4'>
          <ProfileIcon type='secondary' />
          <p className='text ml-2'>Личный кабинет</p>
        </div>
      </header>
    )
  }
};

export default Header;