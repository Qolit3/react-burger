import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types'
import styles from './burger-ingredients.module.css'
import { useSelector } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../util/types';
import { RenderAllIngredients } from '../render-all-ingredients/render-all-ingredients';

export const BurgerIngredients = () => {
  const [current, setCurrent] = useState('0');
  const [buns, setBuns] = useState({ingredientName: 'Загрузка', ingredients: [{}] });
  const [sauces, setSauces] = useState({ingredientName: 'Загрузка', ingredients: [{}] });
  const [mains, setMains] = useState({ingredientName: 'Загрузка', ingredients: [{}] });
  const ingredientsBuns = [buns, sauces, mains];
  const one = '1'
  const two = '2'
  const zero = '0'
  
  const {
    allIngredients,
    bunsPos,
    saucesPos,
    mainsPos } = useSelector(state => ({
      allIngredients: state.allIngredients.ingredients,
      bunsPos: state.tabs.bunsTabPos,
      saucesPos: state.tabs.saucesTabPos,
      mainsPos: state.tabs.mainsTabPos
    }))
  
  useEffect(() => {
    setBuns( {
      ingredientName: 'Булки',
      ingredients: allIngredients.filter((item) => item.type === 'bun')
    })
    setSauces( {
      ingredientName: 'Соусы',
      ingredients: allIngredients.filter((item) => item.type === 'sauce')
    })
    setMains ({
      ingredientName: 'Начинки',
      ingredients: allIngredients.filter((item) => item.type === 'main')
    })   
  },[allIngredients])

  useEffect(() => {
    const tabsPos = document.querySelector('#scroll').getBoundingClientRect().top;
    const bunsDif = Math.abs(bunsPos - tabsPos);
    const saucesDif = Math.abs(saucesPos - tabsPos);
    const mainsDif = Math.abs(mainsPos - tabsPos);
    
    if(bunsDif < saucesDif && bunsDif < mainsDif) {
      setCurrent(zero)
    } else if( saucesDif < mainsDif) {
      setCurrent(one)
    } else {
      setCurrent(two);
    }

  }, [bunsPos] )

  return (
    <div className={styles.ingredients}>
      <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
      <div className={`${styles.tabs} mt-5`}>
        <Tab value={zero} active={current === zero} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value={one} active={current === one} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value={two} active={current === two} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
       
      <RenderAllIngredients items={ingredientsBuns} />
    </div>
  )
}

BurgerIngredients.propTypes = {
  list: PropTypes.arrayOf(ingredientType)
}



export default BurgerIngredients;