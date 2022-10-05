import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import IngredientsBlock from '../ingredients-block/ingredients-block';
import styles from './burger-ingredients.module.css'
import { useSelector } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../util/types';

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('0');
  const [buns, setBuns] = React.useState({ingredientName: 'Загрузка', ingredients: [{}] });
  const [sauces, setSauces] = React.useState({ingredientName: 'Загрузка', ingredients: [{}] });
  const [mains, setMains] = React.useState({ingredientName: 'Загрузка', ingredients: [{}] });
  const ingredientsBuns = [buns, sauces, mains];
  const ingredientsSauces = [sauces, mains, buns];
  const ingredientsMains = [mains, buns, sauces];

  const {
    allIngredients,
    allIngredientsRequest,
    allIngredientsFailed } = useSelector(state => ({
      allIngredients: state.allIngredients.ingredients,
      allIngredientsRequest: state.allIngredients.ingredientsRequest,
      allIngredientsFailed: state.allIngredients.ingredientsFailed
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

  const renderIngerdientsBlocks = () => {    
    if(allIngredientsFailed) {
      return <h1 className='text text_type_main-large mt-10'>Не удалось загрузить</h1>
    } else if(allIngredientsRequest) {
      return <h1 className='text text_type_main-large mt-10'>Загрузка</h1>
    } else {
      return (ingredientsBuns.map((item, index) => <IngredientsBlock key={index} block={item}/>))
    }
  }

  return (
    <div className={styles.ingredients}>
      <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
      <div className={`${styles.tabs} mt-5`}>
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
       
      <div id='scroll' className={styles.scroll}>
        {renderIngerdientsBlocks()}
      </div>

      
    </div>
  )
}

BurgerIngredients.propTypes = {
  list: PropTypes.arrayOf(ingredientType)
}



export default BurgerIngredients;