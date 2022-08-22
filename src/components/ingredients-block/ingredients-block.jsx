import Ingredient from '../ingredient/ingredient';
import styles from './ingredients-block.module.css'
import PropTypes from 'prop-types';
import ingredientType from '../../util/types';

const IngredientsBlock = (props) => {  
  const renderIngerdients = () => {
    return (
      <ul className={`${styles.list} mt-6 ml-4 mr-4`}>
        {props.block.ingredients.map((item) => <Ingredient item={item} key={item._id+1}/>)}
      </ul>
    )
  }

  return (
    <div className='mt-10'>
      <h2 className='text text_type_main-medium'>
        {props.block.ingredientName}
      </h2>
      
        {renderIngerdients()}
      
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


