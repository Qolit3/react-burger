import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useDrag } from "react-dnd/dist/hooks";
import styles from './ingredient.module.css'
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../util/types";
import { SET_MODAL_INGREDIENT } from "../../services/actions/modalActions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


const Ingredient = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const openModal = () => {
    navigate(`/ingredients/${props.item._id}`);
  }
  const item = props.item;
  item.key = uuidv4();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: item
  })

  const burgerIngredients = useSelector(state => state.burgerIng.burgerIngredients)

  const renderCounter = () => {
    let count = burgerIngredients.reduce((prev, item) => item.name === props.item.name? prev+1 : prev , 0)
      if(count) {
        return (<Counter count={count} size='default'/>)
      }
    }
  
  return (
    <li ref={dragRef}>
      
        <div className={styles.ingredient}>
          <Link to={`/ingredients/${props.item._id}`} state={{
            background: location
          }}>
            <img src={props.item.image} className='ml-4'/>
          </Link>
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