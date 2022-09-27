import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useDrag } from "react-dnd/dist/hooks";
import styles from './ingredient.module.css'
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../util/types";
import { SET_MODAL_INGREDIENT } from "../../services/actions/otherActions";

const Ingredient = (props) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({
      type: SET_MODAL_INGREDIENT,
      object: props.item
    })
  }

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: props.item
  })

  const burgerIngredients = useSelector(state => state.other.burgerIngredients)

  const renderCounter = () => {
    let count = burgerIngredients.reduce((prev, item) => item.name === props.item.name? prev+1 : prev , 0)
      if(count) {
        return (<Counter count={count} size='default'/>)
      }
    }
  
  return (
    <li ref={dragRef}>
      <div className={styles.ingredient}  onClick={openModal}>
      <img src={props.item.image} className='ml-4'/>
      <div className={`${styles.currency} mt-1`}>
        <p className={`${styles.digits} text text_type_digits-default`}>{props.item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default mt-1`}>{props.item.name}</p>
      {renderCounter()}
      </div>
    </li>
  )
}

Ingredient.propTypes = {
  item: ingredientType
}

export default Ingredient