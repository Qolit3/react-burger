import { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { useDrag } from "react-dnd/dist/hooks";
import styles from './ingredient.module.css'

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { TRootState } from '../..';
import { IIngredientProps } from '../../types_and_interfacese/interfaces';
import { TIngredient } from '../../types_and_interfacese/types';


export const Ingredient: FunctionComponent<IIngredientProps> = ({ ingredient }) => {
  const location = useLocation();
  console.log(location);
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: () => {
      const item: TIngredient & { key?: string; } = ingredient;
      item.key = uuidv4();
      return item
    }
  })

  const burgerIngredients = useSelector((state: TRootState) => state.burgerIng.burgerIngredients)

  const renderCounter = (): JSX.Element | undefined => {
    let count = burgerIngredients.reduce((prev: number, item: any) => item.name === ingredient.name ? prev + 1 : prev, 0)
    if (count) {
      return (<Counter count={count} size='default' />)
    }
  }

  return (
    <li ref={dragRef}>
      <div className={styles.ingredient}>
        <Link to={`/ingredients/${ingredient._id}`} state={{
          background: location
        }}>
          <img src={ingredient.image} className='ml-4' />
        </Link>
        <div className={`${styles.currency} mt-1`}>
          <p className={`${styles.digits} text text_type_digits-default`}>{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default mt-1`}>{ingredient.name}</p>
        {renderCounter()}
      </div>
    </li>
  )
}

export default Ingredient