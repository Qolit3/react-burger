import React from 'react';
import Header from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import './app.css';
import constructordata from '../../util/constructordata.json'


import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {

  const [current, setCurrent] = React.useState(
    constructordata
  )
  
  return (
    <div className="app">
      <Header />
      <div className='app__main'>
        <BurgerIngredients />
        <BurgerConstructor items={current}/>
      </div>
    </div>
  );
}

export default App;
