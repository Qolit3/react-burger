import { FunctionComponent } from 'react'
import { useAppSelector } from '../..'
import { IRenderAllIngredientsProps } from '../../types-and-interfacese/interfaces'
import styles from '../burger-ingredients/burger-ingredients.module.css'
import IngredientsBlock from '../ingredients-block/ingredients-block'

export const RenderAllIngredients: FunctionComponent<IRenderAllIngredientsProps> = ({ items }) => {

  const {
    allIngredientsRequest,
    allIngredientsFailed} = useAppSelector(state => ({
      allIngredientsRequest: state.allIngredients.ingredientsRequest,
      allIngredientsFailed: state.allIngredients.ingredientsFailed
    }))

  if(allIngredientsFailed) {
    return <h1 className='text text_type_main-large mt-10'>Не удалось загрузить</h1>
  } else if(allIngredientsRequest) {
    return <h1 className='text text_type_main-large mt-10'>Загрузка</h1>
  } else {
    return (
      <div id='scroll' className={styles.scroll}>
        {items.map((item, index) => <IngredientsBlock key={index} id={index} block={item}/>)}
      </div>
    )
  }
}