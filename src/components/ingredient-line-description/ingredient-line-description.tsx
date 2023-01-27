import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { FunctionComponent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../.."
import { IIngredientLineDescriptionProps } from "../../types_and_interfacese/interfaces"
import { TIngredient, TOrderInFeed } from "../../types_and_interfacese/types"
import styles from './ingredient-line-description.module.css'


export const IngredientLineDescription: FunctionComponent<IIngredientLineDescriptionProps> = ({id}) => {
  const { allIngredients, orders } = useAppSelector(store => ({
    allIngredients: store.allIngredients.ingredients,
    orders: store.ordersFeed.data.orders
  }))

  const ingredient = allIngredients.find((item: TIngredient) => item._id === id)
  const params = useParams();
  const [order, setOrder] = useState< TOrderInFeed | undefined>(undefined);
  

  useEffect(() => {
    setOrder(orders?.find((item: TOrderInFeed) => params.id === item._id));
  }, [orders, params])

  let count: number = 0;

  if(order) {
    count = order.ingredients.reduce((sum, current) => {
      if(current === id) return sum + 1
      return sum
    }, 0)
  }
  
  return (
    <div className={`${styles.main} mb-4`}>
      <div className={styles.image_block}>
        <img className={styles.image} src={ingredient.image} alt="ингредиент бургера" />
      </div>
      <p className="text text_type_main-default ml-4 mr-4">{ingredient.name}</p>
      <div className={styles.main + ' ' + styles.price}>
        <p className="text text_type_main-default mr-2">{count} x {ingredient.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  )


}