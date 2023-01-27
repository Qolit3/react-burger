import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { FunctionComponent, useEffect, useState } from "react";
import styles from './orderPage.module.css'
import { useNavigate, useParams } from "react-router-dom";
import { IngredientLineDescription } from "../../components/ingredient-line-description/ingredient-line-description";
import Modal from "../../components/modal/modal";
import { useAppSelector } from "../..";
import { TIngredient, TOrderInFeed } from "../../types_and_interfacese/types";
import { IOrderPageProps } from "../../types_and_interfacese/interfaces";


export const OrderPage: FunctionComponent<IOrderPageProps> = ({ place, modal }) => {
  const params = useParams();
  const navigate = useNavigate();
  const {orders, allIngredients} = useAppSelector(store => ({
    orders: place ? store.profileOrders.data.orders : store.ordersFeed.data.orders,
    allIngredients: store.allIngredients.ingredients
  }));
  const [order, setOrder] = useState<TOrderInFeed | undefined>(undefined)
  let ingredients: string[]  = [];
  let isBunAdded: boolean = false;
  let totalPrice: number = 0;


  order?.ingredients.forEach((item) => {
    allIngredients.forEach((current: TIngredient) => {
      if (item === current._id) {
        if (current.type === 'bun') {
          if (isBunAdded) {return undefined};
          ingredients.push(item);
          isBunAdded = true;
          totalPrice += current.price;
          return undefined
        }
        ingredients.push(item)
        totalPrice += current.price;
      }
    })
  })

  const closeModal = () => {
    navigate(-1);
  }

  useEffect(() => {
    setOrder(orders?.find((item: TOrderInFeed) => params.id === item._id))
  }, [params, orders])

  if (!order) { return <p>Загрузка</p> }
  if (modal) {
    return (
      <Modal active={true} id={'3'} handleClose={closeModal} >
        <div className={styles.modal}>
          <p className={`${styles.text_center} text text_type_main-default`}>#{order.number}</p>
          <h2 className="text text_type_main-medium mt-10">{order.name}</h2>
          <p className="text text_type_main-small mt-3">{order.status}</p>
          <div>
            <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
            <div className={styles.ingredients}>
              {ingredients.map(item => <IngredientLineDescription key={item} id={item} />)}
            </div>
          </div>
          <div className={`${styles.footer} mt-10`}>
            <FormattedDate className="text text_type_main-small text_color_inactive" date={new Date(order.updatedAt)} />
            <div className={styles.price}>
              <p className="text text_type_main-default mr-2 ">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </Modal>
    )
  }
  return (
    <div className={styles.main}>
      <p className={`${styles.text_center} text text_type_main-default`}>#{order.number}</p>
      <h2 className="text text_type_main-medium mt-10">{order.name}</h2>
      <p className="text text_type_main-small mt-3">{order.status}</p>
      <div>
        <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
        <div className={styles.ingredients}>
          {ingredients.map(item => <IngredientLineDescription key={item} id={item} />)}
        </div>
      </div>
      <div className={`${styles.footer} mt-10`}>
        <FormattedDate className="text text_type_main-small text_color_inactive" date={new Date(order.updatedAt)} />
        <div className={styles.price}>
          <p className="text text_type_main-default mr-2 ">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}