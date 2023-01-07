import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { OrderBlock } from "../../components/order-block/order-block";
import styles from './feed.module.css'

export const Feed = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.ordersFeed.data)
  const location = useLocation();
  let doneOrders = [];
  let unDoneOrders = [];
  
  if(data.orders) {
    data.orders.forEach((item) => {
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

  const LinkBlock = ({ item }) => {
    return (
      <Link className={styles.link} to={`/feed/${item._id}`} state={{
        background: location
      }}>
        <OrderBlock item={item} />
      </Link>
    )
  }

  return (
   <div className={styles.main}>
    <div>
      <h2>Лента Заказов</h2>
      <div className={styles.scroll}>
        { data.orders ? data.orders.map((item) => <LinkBlock key={item._id} item={item}/>) : <p>Загрузка</p>}
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