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
import { ADD_BURGER_INGREDIENTS, REMOVE_BURGER_INGREDIENTS } from "../../services/actions/otherActions";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getOrder } from "../../services/actions/createOrderAction";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import { ConstructorItem } from "../constructor-item/constructor-item";



const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const {allIngredients, list} = useSelector(state => ({
    allIngredients: state.allIngredients.ingredients,
    list: state.other.burgerIngredients
  }));

  let currentIngredients = [];
  if(allIngredients.length) {
      currentIngredients = [
      allIngredients[0],
      {...allIngredients[2],
      order: 1},
      {...allIngredients[7],
      order: 2},
      {...allIngredients[9],
      order: 3},
    ];
  }
  useEffect(() => {

      dispatch({
        type: ADD_BURGER_INGREDIENTS,
        ingredients: currentIngredients
      })
  }, [allIngredients])
  
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
    for(let i = 1; i < list.length; i++) {
      renderList.push(
        <ConstructorItem ingredient={list.find(item => item.order === i)} />
        );
      totalPrice = totalPrice + list[i].price;
    }
    
  }

  const renderConstructrList = () => {
    if(list.length){
      renderIngredients();
      list.forEach(item => {
        if(item.type === 'bun') {
          totalPrice = totalPrice + item.price*2;
          renderList.push(
            <ConstructorItem ingredient={item} position={'bottom'} />
          );
          renderList.unshift(
            <ConstructorItem ingredient={item} position={'top'} />
          );
        }
      })
      return renderList
    } else{
      return <p className={`text text_type_main-default`}>Заказ пуст</p>
    }
  }

  
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      let newList = list;
      if(item.type === 'bun') {
        newList.splice(list.findIndex(obj => obj.type === item.type), 1, item)
      } else {
        newList.push({...item, order: list.length})
      }
      dispatch({
        type: ADD_BURGER_INGREDIENTS,
        ingredients: newList
      })
    }
  })

  return (
    <div className={`${styles.constructor} mt-25 ml-4 mr-4`}>
      <div ref={dropTarget}  className={styles.list}>
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