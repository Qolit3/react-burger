import { useEffect, useMemo } from "react";
import {
  useSelector,
  useDispatch } from 'react-redux';
import { 
  CurrencyIcon,
  Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getOrder, REMOVE_ORDER_MODAL, SET_ORDER_MODAL } from "../../services/actions/createOrderAction";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import { ADD_BURGER_INGREDIENTS } from "../../services/actions/burgerIngActions";
import { RenderIngerdients } from "../render-ingredients/render-ingredients";
import { bun } from "../../util/constants";
import { useNavigate } from "react-router-dom";



const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const {allIngredients, list, activeOrder} = useSelector(state => ({
    allIngredients: state.allIngredients.ingredients,
    list: state.burgerIng.burgerIngredients,
    activeOrder: state.order.orderModal
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

  const closeModal = () => {
    dispatch({
      type: REMOVE_ORDER_MODAL
    })
  }
  
  const navigate = useNavigate();
  const isAuth = useSelector(store => store.user.isAuthorized)
  const openModal = () => {
    if(!isAuth) {
      return navigate('/login')
    }
    let idList = list.map(item => item._id);
    idList.push(list[0]._id);
    dispatch(getOrder(idList));
    dispatch({
      type: SET_ORDER_MODAL
    })
  }


  
  const priceMath = (list) => {
    let price = 0;
    list.forEach(item => {
      if(item.type === bun) {
        price = price + item.price*2
      } else {
        price = price + item.price;
      }
    })
    
    return price
  }

  let totalPrice = useMemo(() => priceMath(list), [list.length, list[0]])

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      let newList = list;
      if(item.type === bun) {
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
        <RenderIngerdients list={list} />
      </div>
      <div className={`${styles.result} mt-10`}>
        <div className={`mr-10 ${styles.currency}`}>
          <p className={`${styles.price} text text_type_digits-default`}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={openModal}>Оформить заказ</Button>
      </div>
      <Modal id={2} active={activeOrder} handleClose={closeModal}>
        <OrderDetails />
      </Modal>
    </div>
  )
}

export default BurgerConstructor;