import Ingredient from '../ingredient/ingredient';
import styles from './ingredients-block.module.css'
import PropTypes from 'prop-types';
import ingredientType from '../../util/types';

const IngredientsBlock = (props) => {  
  const renderIngerdients = () => {
    
    return props.block.ingredients.map((item, index) => <Ingredient item={item} key={index}/>)
    //Я правда не знаю, как передать id так, чтобы не выходило ошибки в консоль
    
  }

  return (
    <div className='mt-10'>
      <h2 className='text text_type_main-medium'>
        {props.block.ingredientName}
      </h2>
      <ul className={`${styles.list} mt-6 ml-4 mr-4`}>
        {renderIngerdients()}
      </ul>
    </div>
  )  
}

IngredientsBlock.propTypes = {
  block: PropTypes.shape({
    ingredientName: PropTypes.string,
    ingredients: PropTypes.arrayOf(ingredientType)
})

}

export default IngredientsBlock


