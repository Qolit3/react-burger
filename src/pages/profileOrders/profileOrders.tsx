import { FunctionComponent, useEffect } from 'react'
import { ORDERS_CONNECT, ORDERS_DISCONNECT } from "../../services/actions/ordersActions"
import styles from './profileOrders.module.css'
import { useAppDispatch, useAppSelector } from "../.."
import { TOrderInFeed } from "../../types_and_interfacese/types"
import { LinkBlock } from "../../components/link-block/link-block"
import { getCookie } from '../../util/functions'


export const ProfileOrders: FunctionComponent = () => {
  const data = useAppSelector(state => state.profileOrders.data)
  const dispatch = useAppDispatch();

  useEffect((): (() => void) => {
    dispatch({
      type: ORDERS_CONNECT,
      token: getCookie('accessToken') 
    })
    return () => dispatch({ type: ORDERS_DISCONNECT })
  }, [])

  return (
    <div className={styles.scroll}>
      {data.orders ? data.orders.map((item: TOrderInFeed) => <LinkBlock key={item._id} item={item} to='profile/orders' />) : <p>Загрузка</p>}
    </div>
  )
}