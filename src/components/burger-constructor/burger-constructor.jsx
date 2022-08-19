import React from "react";
import { 
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-constructor.module.css'
import PropTypes from 'prop-types';

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ingredientType from "../../util/types";

const BurgerConstructor = (props) => {

  const [active, setActive] = React.useState(false);

  const closeModal = () => {
    setActive(false);
  }

  const openModal = () => {
    setActive(true);
  }

  const renderConstructrList = () => {
    return (props.items.map((item, index, arr) => {
      if(index === 0 ) {
        return( 
        <div key={item._id}  className={styles.ingredient}>
          <ConstructorElement type="top" text={`${item.name} (верх)`} thumbnail={item.image} price={item.price} isLocked={true}/>
        </div>
        )    
      } else if(index !== arr.length - 1) {
        return(
        <div key={item._idx} className={`${styles.ingredient} mt-4`}>
          <DragIcon type="primary"/>
          <ConstructorElement text={item.name} thumbnail={item.image} price={item.price}/>
        </div>
        )
      } else {
        return(
          <div key={item._id}>
            <div  className={`${styles.ingredient} mt-4`}>
              <DragIcon type="primary"/>
              <ConstructorElement text={item.name} thumbnail={item.image} price={item.price}/>
            </div>
            <div  className={`${styles.ingredient} mt-4`}>
              <ConstructorElement type="bottom" text={`${arr[0].name} (низ)`} thumbnail={arr[0].image} price={arr[0].price} isLocked={true}/>
            </div>
          </div>
        
          )    
      }
  }))
  }

  return (
    <div className={`${styles.constructor} mt-25 ml-4 mr-4`}>
      <div className={styles.list}>
        {
          renderConstructrList()
        }
      
      </div>
      <div className={`${styles.result} mt-10`}>
        <div className={`mr-10 ${styles.currency}`}>
          <p className={`${styles.price} text text_type_digits-default`}>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={openModal}>Оформить заказ</Button>
      </div>

      <Modal handleClose={closeModal} active={active}>
        <OrderDetails orderNumber={'333333'} />
      </Modal>
    </div>
  )
}

BurgerConstructor.propTypes = {
  items: PropTypes.arrayOf(ingredientType)
}

export default BurgerConstructor;