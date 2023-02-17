import { FunctionComponent, useEffect, useState } from 'react';
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { RenderAllIngredients } from '../render-all-ingredients/render-all-ingredients';
import { TBlock, TIngredient } from '../../types-and-interfacese/types';
import { useAppSelector } from '../..';

export const BurgerIngredients: FunctionComponent = () => {
  const [current, setCurrent] = useState<string>('0');
  const [buns, setBuns] = useState<TBlock>({ingredientName: 'Загрузка', ingredients: [] });
  const [sauces, setSauces] = useState<TBlock>({ingredientName: 'Загрузка', ingredients: [] });
  const [mains, setMains] = useState<TBlock>({ingredientName: 'Загрузка', ingredients: [] });
  const ingredientsBuns = [buns, sauces, mains];
  const one = '1'
  const two = '2'
  const zero = '0'
  
  const {
    allIngredients,
    bunsPos,
    saucesPos,
    mainsPos } = useAppSelector((state) => ({
      allIngredients: state.allIngredients.ingredients,
      bunsPos: state.tabs.bunsTabPos,
      saucesPos: state.tabs.saucesTabPos,
      mainsPos: state.tabs.mainsTabPos
    }))
  
  useEffect(() => {
    setBuns( {
      ingredientName: 'Булки',
      ingredients: allIngredients.filter(item => item.type === 'bun')
    })
    setSauces( {
      ingredientName: 'Соусы',
      ingredients: allIngredients.filter(item => item.type === 'sauce')
    })
    setMains ({
      ingredientName: 'Начинки',
      ingredients: allIngredients.filter(item => item.type === 'main')
    })   
  },[allIngredients])

  useEffect(() => {
    const tabsPos = document.querySelector('#scroll')?.getBoundingClientRect().top;
    if(tabsPos) {
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

export default BurgerIngredients;