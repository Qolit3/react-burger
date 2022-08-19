import React from "react";
import styles from './ingredient.module.css'
import constructordata from '../../util/constructordata.json'
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import modal from '../modal/modal.module.css'
import ingredientType from "../../util/types";

const Ingredient = (props) => {

  const [active, setActive] = React.useState(false);

  const closeModal = () => {
    setActive(false);
  }

  const openModal = () => {
    setActive(true);
  }


  const renderCounter = () => {
    let count = 0;
    constructordata.forEach((item) => {
      if(item.name === props.item.name) {
        count +=1
      }
    })
      if(count) {
        return (<Counter count={count} size='default'/>)
      }
    }
  


  return (
    <li>
      <div className={styles.ingredient}  onClick={openModal}>
      <img src={props.item.image} className='ml-4'/>
      <div className={`${styles.currency} mt-1`}>
        <p className={`${styles.digits} text text_type_digits-default`}>{props.item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default mt-1`}>{props.item.name}</p>
      {renderCounter()}
      </div>
      <Modal handleClose={closeModal} active={active}>
        <div className="mr-15 ml-15">
          <h2 className="text text_type_main-large mt-10">Детали ингридиента</h2>
          <img src={props.item.image_large} />
          <h3 className={`${modal.text} text_type_main-medium text mt-4`}>{props.item.name}</h3>
          <div className={`${modal.row} mt-8 mb-15`}>
            <div>
              <p className={`${modal.text} text_type_main-default text text_color_inactive`}>Калории,ккал</p>
              <p className={`${modal.text} text_type_digits-default text text_color_inactive`}>{props.item.calories}</p>
            </div>
            <div>
              <p className={`${modal.text} text_type_main-default text text_color_inactive`}>Белки, г</p>
              <p className={`${modal.text} text_type_digits-default text text_color_inactive`}>{props.item.proteins}</p>
            </div>
            <div>
              <p className={`${modal.text} text_type_main-default text text_color_inactive`}>Жиры, г</p>
              <p className={`${modal.text} text_type_digits-default text text_color_inactive`}>{props.item.fat}</p>
            </div>
            <div>
              <p className={`${modal.text} text_type_main-default text text_color_inactive`}>Углеводы, г</p>
              <p className={`${modal.text} text_type_digits-default text text_color_inactive`}>{props.item.carbohydrates}</p>
            </div>
          </div>
        </div>
      </Modal>
    </li>
  )
}

Ingredient.propTypes = {
  item: ingredientType
}

export default Ingredient