import { FunctionComponent, useEffect } from 'react'
import Ingredient from '../ingredient/ingredient';
import styles from './ingredients-block.module.css'
import { IIngredientsBlockProps } from '../../types-and-interfacese/interfaces';
import { useAppDispatch } from '../..';


const IngredientsBlock:FunctionComponent<IIngredientsBlockProps> = ({ block, id }) => {  
  const renderIngerdients = () => {
    return (
      <ul className={`${styles.list} mt-6 ml-4 mr-4`}>
        {block.ingredients.map((item) => <Ingredient ingredient={item} key={item._id+1}/>)}
      </ul>
    )
  }

  const dispatch = useAppDispatch();  

  let type: string;
  if(block.ingredientName === 'Булки') {
    type = 'BUNS'
  } else if (block.ingredientName === 'Соусы') {
    type = 'SAUCES'
  } else {
    type = 'MAINS'
  }
  useEffect(() => {
    const scroll: HTMLElement = document.querySelector('#scroll') as HTMLElement;
    const update = (): void => {
      const top = document.querySelector(`#title${id}`)?.getBoundingClientRect().top;
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
      <h2 id={`title${id}`} className='text text_type_main-medium'>
        {block.ingredientName}
      </h2>
        {renderIngerdients()}
    </div>
  )  
}

export default IngredientsBlock


