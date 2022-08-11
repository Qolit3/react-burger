import React, { useEffect } from 'react';
import data from '../../util/data.json'
import IngredientsBlock from '../ingredients-block/ingredients-block';
import './burger-ingredients.css'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('0');
  const [buns, setBuns] = React.useState({ingredientName: 'Загрузка', ingredients: [{}] });
  const [sauces, setSauces] = React.useState({ingredientName: 'Загрузка', ingredients: [{}] });
  const [mains, setMains] = React.useState({ingredientName: 'Загрузка', ingredients: [{}] });
  const ingredientsBuns = [buns, sauces, mains];
  const ingredientsSauces = [sauces, mains, buns];
  const ingredientsMains = [mains, buns, sauces];

  useEffect(() => {
    setBuns( {
      ingredientName: 'Булки',
      ingredients: data.filter((item) => item.type === 'bun')
    })
    setSauces( {
      ingredientName: 'Соусы',
      ingredients: data.filter((item) => item.type === 'sauce')
    })
    setMains ({
      ingredientName: 'Начинки',
      ingredients: data.filter((item) => item.type === 'main')
    })   
  },[])

  const renderIngerdientsBlocks = () => {
    if(current === '0') {
      
      return (ingredientsBuns.map((item, index) => <IngredientsBlock key={index} block={item}/>))
    } else if (current === '1') {
      return (ingredientsSauces.map((item, index) => <IngredientsBlock key={index} block={item}/>))
    } else {
      return (ingredientsMains.map((item, index) => <IngredientsBlock key={index} block={item}/>))
    }
  }

  return (
    <div className='burger-ingredients'>
      <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
      <div className='burger-ingredients__tabs mt-5'>
        <Tab value="0" active={current === '0'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="1" active={current === '1'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="2" active={current === '2'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div>
        {renderIngerdientsBlocks()}
      </div>
    </div>
  )

}

export default BurgerIngredients;