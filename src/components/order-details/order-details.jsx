import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-details.module.css'
import PropTypes from 'prop-types';





const OrderDetails = ({orderNumber}) => {


  return(
    <div className="mr-25 ml-25">
      <h2 className={`${styles.text} text text_type_digits-large mt-30`}>{orderNumber}</h2>
      <p className={`${styles.text} text text_type_main-medium mt-8 mb-15`}>индентификатор заказа</p>
      <div className={`${styles.done} ${styles.done_3}`}>
        <div className={`${styles.done} ${styles.done_2}`}>
          <div className={`${styles.done} ${styles.done_1}`}>
            <CheckMarkIcon type="primary" />
          </div>
        </div>
      </div>
      <p className={`${styles.text} text text_type_main_default mt-15`}>Ваш заказ начали готовить</p>
      <p className={`${styles.text} text text_type_main_small text_color_inactive mb-30 mt-2`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.string
}

export default OrderDetails;