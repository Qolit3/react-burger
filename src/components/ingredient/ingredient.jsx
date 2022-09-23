import React from "react";
import { useDispatch } from 'react-redux'
import styles from './ingredient.module.css'
import constructordata from '../../util/constructordata.json'
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import modal from '../modal/modal.module.css'
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

//переписать 
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
    </li>
  )
}

Ingredient.propTypes = {
  item: ingredientType
}

export default Ingredient