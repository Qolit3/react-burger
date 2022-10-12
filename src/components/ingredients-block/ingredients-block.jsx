import { useDispatch } from 'react-redux';
import { useEffect } from 'react'
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

  const dispatch = useDispatch();  

  let type;
  if(props.block.ingredientName === 'Булки') {
    type = 'BUNS'
  } else if (props.block.ingredientName === 'Соусы') {
    type = 'SAUCES'
  } else {
    type = 'MAINS'
  }
  useEffect(() => {
    const scroll = document.querySelector('#scroll');
    const update = () => {
      const top = document.querySelector(`#title${props.id}`).getBoundingClientRect().top;
      dispatch({
        type: `CHANGE_${type}_TAB_POSITION`,
        pos: top
      })
    }
    
    scroll.addEventListener('scroll', update)
    return () => {scroll.removeEventListener('scroll', update)}
  }, [])

  
  

  return (
    <div className='mt-10'>
      <h2 id={`title${props.id}`} className='text text_type_main-medium'>
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


