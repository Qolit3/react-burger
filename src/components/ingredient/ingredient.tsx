import React from "react";
import './ingredient.css'
import constructordata from '../../util/constructordata.json'
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";

const Ingredient = (props: any) => {

  const [active, setActive] = React.useState(false);

  const closeModal = () => {
    setActive(false);
  }

  const openModal = () => {
    setActive(true);
  }


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
    <li>
      <div className="ingredient"  onClick={openModal}>
      <img src={props.item.image} className='ml-4'/>
      <div className="ingredient__currency mt-1">
        <p className="ingredient__currency-digits text text_type_digits-default">{props.item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="ingredient__name text text_type_main-default mt-1">{props.item.name}</p>
      {renderCounter()}
      </div>
      <Modal handleClose={closeModal} active={active}>
        <div className="mr-15 ml-15">
          <h2 className="text text_type_main-large mt-10">Детали ингридиента</h2>
          
          <img src={props.item.image_large} />
          <h3 className="text text_type_main-medium modal__text mt-4">{props.item.name}</h3>
          <div className="modal__row-box mt-8 mb-15">
            <div>
              <p className="text text_type_main-default modal__text text_color_inactive">Калории,ккал</p>
              <p className="text text_type_digits-default text_color_inactive modal__text">{props.item.calories}</p>
            </div>
            <div>
              <p className="text text_type_main-default modal__text text_color_inactive">Белки, г</p>
              <p className="text text_type_digits-default text_color_inactive modal__text">{props.item.proteins}</p>
            </div>
            <div>
              <p className="text text_type_main-default modal__text text_color_inactive">Жиры, г</p>
              <p className="text text_type_digits-default text_color_inactive modal__text">{props.item.fat}</p>
            </div>
            <div>
              <p className="text text_type_main-default modal__text text_color_inactive">Углеводы, г</p>
              <p className="text text_type_digits-default text_color_inactive modal__text">{props.item.carbohydrates}</p>
            </div>
          </div>
        </div>
      </Modal>
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