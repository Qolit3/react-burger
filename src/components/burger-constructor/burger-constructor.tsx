import React from "react";
import { ConstructorElement, CurrencyIcon, DeleteIcon, DragIcon, LockIcon, Button, CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { preProcessFile } from "typescript";

import './burger-constructor.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";


const BurgerConstructor = (props: any) => {

  const [active, setActive] = React.useState(false);

  const closeModal = () => {
    setActive(false);
  }

  const openModal = () => {
    setActive(true);
  }

  
  

  const renderConstructrList = () => {
    return (props.items.map((item: any, index: any, arr:  any) => {
      if(index === 0 ) {
        return( 
        <div key={index}  className="burger-constructor__ingredient">
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
          <div key={index}>
            <div  className="burger-constructor__ingredient mt-4">
              <DragIcon type="primary"/>
              <ConstructorElement text={item.name} thumbnail={item.image} price={item.price}/>
            </div>
            <div  className="burger-constructor__ingredient mt-4">
              <ConstructorElement type="bottom" text={`${arr[0].name} (низ)`} thumbnail={arr[0].image} price={arr[0].price} isLocked={true}/>
            </div>
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
        <Button type="primary" size="medium" onClick={openModal}>Оформить заказ</Button>
      </div>

      <Modal handleClose={closeModal} active={active}>
        <div className="mr-25 ml-25">
          <h2 className="text text_type_digits-large mt-30">034546</h2>
          <p className="modal__text text text_type_main-medium mt-8 mb-15">индентификатор заказа</p>
          <div className="modal__done modal__done_3 ">
            <div className="modal__done modal__done_2">
              <div className="modal__done modal__done_1">
                <CheckMarkIcon type="primary" />
              </div>
            </div>
          </div>
          <p className="modal__text text text_type_main_default mt-15">Ваш заказ начали готовить</p>
          <p className="modal__text text text_type_main_small text_color_inactive mb-30 mt-2">Дождитесь готовности на орбитальной станции</p>
        </div>
      </Modal>
    </div>
  )
}

export default BurgerConstructor;