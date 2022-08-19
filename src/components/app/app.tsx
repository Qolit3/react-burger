import React, { useEffect } from 'react';
import Header from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css'
import constructordata from '../../util/constructordata.json'


import BurgerConstructor from '../burger-constructor/burger-constructor';


function App() {

  const [current, setCurrent] = React.useState(constructordata)
  const [list, setList] = React.useState([]);


  const api = 'https://norma.nomoreparties.space/api/ingredients';

  useEffect(() => {
    

    const getProductData = async () => {
      return await fetch(api)     
    }

    getProductData()
    .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(res => setList(res.data))
      .catch(res => console.log(res));
  }, [])

  
  


  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.main}>
        <BurgerIngredients list={list}/>
        <BurgerConstructor items={current}/>
      </div>
    </div>
  );
}



export default App;
