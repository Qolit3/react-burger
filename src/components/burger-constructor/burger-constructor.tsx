import React from "react";
import { ConstructorElement, CurrencyIcon, DeleteIcon, DragIcon, LockIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { preProcessFile } from "typescript";

import './burger-constructor.css'

const BurgerConstructor = (props: any) => {

  

  const renderConstructrList = () => {
    return (props.items.map((item: any, index: any, arr:  any) => {
      if(index === 0 ) {
        return( 
        <div key={index} className="burger-constructor__ingredient">
          <ConstructorElement type="top" text={`${item.name} (верх)`} thumbnail={item.image} price={item.price} isLocked={true}/>
        </div>
        )    
      } else if(index !== arr.length - 1) {
        return(
        <div key={index} className="burger-constructor__ingredient mt-4">
          <DragIcon type="primary"/>
          <ConstructorElement text={item.name} thumbnail={item.image} price={item.price}/>
        </div>
        )
      } else {
        return( 
        <div key={index} className="burger-constructor__ingredient mt-4">
          <ConstructorElement type="bottom" text={`${item.name} (низ)`} thumbnail={item.image} price={item.price} isLocked={true}/>
        </div>
          )    
      }
    
  }))
  }


  return (
    <div className=" burger-constructor mt-25 ml-4 mr-4">
      <div className="burger-constructor__list">
        {
          renderConstructrList()
        }
      
      </div>
      <div className="burger-constructor__result mt-10">
        <div className="mr-10 burger-constructor__currency">
          <p className="burger-constructor__currency-number text text_type_digits-default ">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium">Оформить заказ</Button>
      </div>
    </div>
  )
}

export default BurgerConstructor;