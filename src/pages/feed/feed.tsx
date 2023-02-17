import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../..";
import { LinkBlock } from "../../components/link-block/link-block";
import { FEED_CONNECT, FEED_DISCONNECT } from "../../services/actions/feed-actions";
import { TOrderInFeed } from "../../types-and-interfacese/types";
import styles from './feed.module.css'

export const Feed: FunctionComponent = () => {
  const data = useAppSelector(state => state.ordersFeed.data);
  const dispatch = useAppDispatch();
  
  useEffect((): (() => void)  => {
    dispatch({type: FEED_CONNECT})
    return () => dispatch({type: FEED_DISCONNECT})
  }, [])
  
  let doneOrders: TOrderInFeed[] = [];
  let unDoneOrders: TOrderInFeed[] = [];
  
  if(data.orders) {
    data.orders.forEach(item => {
      if(item.status === 'done') {
        if(doneOrders.length < 30) {
          doneOrders.push(item);
        }
      } else {
        if(unDoneOrders.length < 30) {
          unDoneOrders.push(item);
        }
      }
    })
  }

  return (
   <div className={styles.main}>
    <div>
      <h2>Лента Заказов</h2>
      <div className={styles.scroll}>
        { data.orders ? data.orders.map(item => <LinkBlock key={item._id} item={item} to='feed'/>) : <p>Загрузка</p>}
      </div>
    </div>
    <div className="ml-15 mt-15">
      <div>
        <div className={styles.flex}>
          <div className={`${styles.done_box} mr-9`}>
            <p className="text text_type_main-default mb-6">Готовы:</p>
            <div className={styles.numbers_box}>
              {doneOrders[0] ? doneOrders.map((item) => <p key={item.number} className="text text_type_main-default">{item.number}</p>) : <p>загрузка</p>}
            </div>
          </div>
          <div className={styles.done_box}>
            <p className="text text_type_main-default mb-6">В работе:</p>
            <div className={styles.numbers_box}>
              {unDoneOrders.map((item) => <p key={item.number} className="text text_type_main-default">{item.number}</p>)}
            </div>
          </div>
        </div>
        <p className="text text_type_main-default mt-15">
          Выполнено за всё время:
        </p>
        <p className="text text_type_digits-large">
          {data.total}
        </p>
        <p className="text text_type_main-default mt-15">
          Выполнено за сегодня:
        </p>
        <p className="text text_type_digits-large">
          {data.totalToday}
        </p>
      </div>
    </div>
   </div> 
  ) 
}