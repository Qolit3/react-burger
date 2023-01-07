import { useDispatch, useSelector } from "react-redux"
import { OrderBlock } from "../../components/order-block/order-block"
import { useEffect } from 'react'
import { ORDERS_CONNECT, ORDERS_DISCONNECT } from "../../services/actions/ordersActions"
import styles from './profileOrders.module.css'
import { Link, useLocation } from "react-router-dom"


export const ProfileOrders = () => {
  const data = useSelector(state => state.profileOrders.data)
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: ORDERS_CONNECT })
    return () => dispatch({ type: ORDERS_DISCONNECT })
  }, [])

  const LinkBlock = ({ item }) => {
    return (
      <Link className={styles.link} to={`/profile/orders/${item._id}`} state={{
        background: location
      }}>
        <OrderBlock item={item} />
      </Link>
    )
  }


  return (
    <div className={styles.scroll}>
      {data.orders ? data.orders.map((item) => <LinkBlock key={item._id} item={item} />) : <p>Загрузка</p>}
    </div>
  )
}