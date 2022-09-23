import React, { useEffect } from 'react';
import Header from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch } from 'react-redux';
import { getAllIngredients } from '../../services/actions/allIngredientsAction';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllIngredients())
  }, [])

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.main}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </div>
    </div>
  );
}

export default App;