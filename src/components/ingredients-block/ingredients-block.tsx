import React from 'react';
import Ingredient from '../ingredient/ingredient';
import './ingredients-block.css'
import PropTypes from 'prop-types';

const IngredientsBlock = (props: any) => {  
  const renderIngerdients = () => {
    
    return props.block.ingredients.map((item: any, index: any) => <Ingredient key={index} item={item}/>)
  }

  return (
    <div className='ingredients-block mt-10'>
      <h2 className='text text_type_main-medium'>
        {props.block.ingredientName}
      </h2>
      <ul className='ingredients-block__list mt-6 ml-4 mr-4'>
        {renderIngerdients()}
      </ul>
    </div>
  )  
}

IngredientsBlock.propTypes = {
  block: PropTypes.shape({
    ingredientName: PropTypes.string,
    ingredients:   
      PropTypes.arrayOf(
        PropTypes.shape({
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
  }))
})

}

export default IngredientsBlock


