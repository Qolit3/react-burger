import { useMemo, FunctionComponent } from "react";
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
import { useAppDispatch, useAppSelector } from "../..";
import { TIngredient } from "../../types_and_interfacese/types";



const BurgerConstructor: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const {list, activeOrder, isAuth} = useAppSelector(store => ({
    list: store.burgerIng.burgerIngredients,
    activeOrder: store.order.orderModal ,
    isAuth: store.user.isAuthorized

  }));

  const closeModal = () => {
    dispatch({
      type: REMOVE_ORDER_MODAL
    })
  }
  
  const navigate = useNavigate();
  const openModal = () => {
    console.log(isAuth)
    if(!isAuth) {
      return navigate('/login')
    }
    let idList = list.map((item: TIngredient) => item._id);
    idList.push(list[0]._id);
    dispatch(getOrder(idList));
    dispatch({
      type: SET_ORDER_MODAL
    })
  }


  
  const priceMath = (list: TIngredient[]) => {
    let price: number = 0;
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
    drop(item: TIngredient) {
      let newList = list;
      if(item.type === bun) {
        newList.splice(list.findIndex((obj: TIngredient) => obj.type === item.type), 1, item)
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
        <Button type="primary" htmlType="button" size="medium" onClick={openModal}>Оформить заказ</Button>
      </div>
      <Modal id={'2'} active={activeOrder} handleClose={closeModal}>
        <OrderDetails />
      </Modal>
    </div>
  )
}

export default BurgerConstructor;