import React from "react";
import './ingredient.css'
import constructordata from '../../util/constructordata.json'
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

const Ingredient = (props: any) => {

  const renderCounter = () => {
    let count = 0;
    constructordata.forEach((item: any) => {
      if(item.name === props.item.name) {
        count +=1
      }
    })
      if(count) {
        return (<Counter count={count} size='default'/>)
      }
    }
  


  return (
    <li  className="ingredient">
      <img src={props.item.image} className='ml-4'/>
      <div className="ingredient__currency mt-1">
        <p className="ingredient__currency-digits text text_type_digits-default">{props.item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="ingredient__name text text_type_main-default mt-1">{props.item.name}</p>
      {renderCounter()}
    </li>
  )
}

Ingredient.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })
}

export default Ingredient