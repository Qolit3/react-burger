import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { FunctionComponent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../.."
import { IIngredientLineDescriptionProps } from "../../types-and-interfacese/interfaces"
import { TIngredient, TOrderInFeed } from "../../types-and-interfacese/types"
import styles from './ingredient-line-description.module.css'


export const IngredientLineDescription: FunctionComponent<IIngredientLineDescriptionProps> = ({id, place}) => {
  const { allIngredients, orders } = useAppSelector(store => ({
    allIngredients: store.allIngredients.ingredients,
    orders: place ? store.profileOrders.data.orders : store.ordersFeed.data.orders,
  }))

  const ingredient = allIngredients.find(item => item._id === id)
  const params = useParams();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const order = orders.find(item => {
      return params.id === item._id
    })
    console.log(order);
    
    if(order) {
      const a = order.ingredients.reduce((sum, current) => {        
        if(current === id) return sum + 1
        return sum
      }, 0)
      setCount(a)      
    }
  }, [orders, params])    
  
  if(ingredient) return (
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

  return (
    <p>Ошибка загрузки</p>
  )
}