import { useState, useEffect, FunctionComponent } from 'react';
import { useParams } from "react-router-dom";
import { useAppSelector } from '../..';
import { TIngredient } from '../../types_and_interfacese/types';
import { DiscribeBlock } from '../discibe-block/discrie-block';
import styles from './page-view.module.css'


export const PageView: FunctionComponent = () => {
  const params = useParams();
  const ingredients = useAppSelector(store => store.allIngredients.ingredients);
  const [item, setItem] = useState<TIngredient | undefined>(undefined);
  useEffect(() => {
    setItem(ingredients.find((item: TIngredient) => params.id === item._id));
  }, [ingredients, params])

  const Card = () => {
    if (!item) {
      return(
        <div className={styles.card}>
          <h2 className={`text text_type_main-large mt-10`}>Загрзука</h2>
        </div>
      )
    } else {
    return (
      <div className={styles.card}>
        <h2 className={`${styles.text} text text_type_main-large mt-10`}>Детали ингридиента</h2>
        <img src={item.image_large} className={styles.image}/>
        <h3 className={`${styles.text} text_type_main-medium text mt-4`}>{item.name}</h3>
        <div className={`${styles.row} mt-8 mb-15`}>
          <DiscribeBlock text='Калории,ккал' digits={item.calories} />
          <DiscribeBlock text='Белки, г' digits={item.proteins} />
          <DiscribeBlock text='Жиры, г' digits={item.fat} />
          <DiscribeBlock text='Углеводы, г' digits={item.carbohydrates} />
        </div>
      </div>
    )}
  }

  return(
    <Card />
  )
}