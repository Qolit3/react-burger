import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import IngredientsBlock from '../ingredients-block/ingredients-block';
import './burger-ingredients.css'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = ({list}:any) => {
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
      ingredients: list.filter((item: any) => item.type === 'bun')
    })
    setSauces( {
      ingredientName: 'Соусы',
      ingredients: list.filter((item: any) => item.type === 'sauce')
    })
    setMains ({
      ingredientName: 'Начинки',
      ingredients: list.filter((item: any) => item.type === 'main')
    })   
  },[list])

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

BurgerIngredients.propTypes = {
  list:
      PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
          name: PropTypes.string,
          type: PropTypes.string,
          proteins: PropTypes.number,
          fat: PropTypes.number,
          carbohydrates: PropTypes.number,
          calories: PropTypes.number,
          price: PropTypes.number,
          image: PropTypes.string,
          image_mobile: PropTypes.string,
          image_large: PropTypes.string,
          __v: PropTypes.number
  }))
}



export default BurgerIngredients;