import React, { useEffect } from "react";
import {
  useSelector,
  useDispatch } from 'react-redux';
import { 
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-constructor.module.css'
import { GET_BURGER_INGREDIENTS } from "../../services/actions/otherActions";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getOrder } from "../../services/actions/createOrderAction";



const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const allIngredients = useSelector(state => state.allIngredients.ingredients);
  let currentIngredients = [];
  if(allIngredients.length) {
      currentIngredients = [
      allIngredients[0],
      allIngredients[2],
      allIngredients[7],
      allIngredients[9],
    ];
  }
  useEffect(() => {
    dispatch({
      type: GET_BURGER_INGREDIENTS,
      ingredients: currentIngredients
    })
  }, [allIngredients])
  
  const list = useSelector(state => state.other.burgerIngredients)

  const [active, setActive] = React.useState(false);

  const closeModal = () => {
    setActive(false);
  }

  const openModal = () => {
    dispatch(getOrder(list.map(item => item._id)))
    setActive(true);
  }

  let totalPrice = 0;
  let renderList = [];

  const renderIngredients = () => {
    list.forEach(item => {
      if(item.type !== 'bun') {
        totalPrice = totalPrice + item.price;
        renderList.push(
          <div key={item._id} className={`${styles.ingredient} mt-4`}>
            <DragIcon type="primary"/>
            <ConstructorElement text={item.name} thumbnail={item.image} price={item.price}/>
          </div>
        )
      }
    })
  }

  const renderConstructrList = () => {
    if(list.length){
      renderIngredients();
      list.forEach(item => {
        if(item.type === 'bun') {
          totalPrice = totalPrice + item.price*2;
          renderList.push(
            <div key={item._id}  className={`${styles.ingredient} mt-4`}>
              <ConstructorElement type="bottom" text={`${item.name} (низ)`} thumbnail={item.image} price={item.price} isLocked={true}/>
            </div>
          );
          renderList.unshift(
            <div key={item._id+1}  className={styles.ingredient}>
              <ConstructorElement type="top" text={`${item.name} (верх)`} thumbnail={item.image} price={item.price} isLocked={true}/>
            </div>
          );
        }
      })
      return renderList
    } else{
      return <p className={`text text_type_main-default`}>Заказ пуст</p>
    }
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
          <p className={`${styles.price} text text_type_digits-default`}>{totalPrice}</p>
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

export default BurgerConstructor;