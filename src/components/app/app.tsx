import React, { useEffect } from 'react';
import Header from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import './app.css';
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
    .then(res => res.json())
    .then(res => setList(res.data))
      .catch(res => {throw new Error(res)});
  }, [])

  
  


  return (
    <div className="app">
      <Header />
      <div className='app__main'>
        <BurgerIngredients list={list}/>
        <BurgerConstructor items={current}/>
      </div>
    </div>
  );
}



export default App;
