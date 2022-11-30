import { useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Modal from "../../components/modal/modal";
import modal from '../../components/modal/modal.module.css'
import styles from './ingredientDetails.module.css'


export const IngredientDetails = ({id, handleClose}) => {
  const params = useParams();
  const ingredients = useSelector(store => store.allIngredients.ingredients);
  const active = useSelector(state => state.modal.modalStatus)
  const [item, setItem] = useState(undefined);

  useEffect(() => {
    setItem(ingredients.find((item) => params.id === item._id));
  }, [ingredients, params])

  const DiscribeBlock = ({text, digits}) =>{
    return (
      <div>
        <p className={`${modal.text} text_type_main-default text text_color_inactive`}>{text}</p>
        <p className={`${modal.text} text_type_digits-default text text_color_inactive`}>{digits}</p>
      </div>
    )
  }
  const cardStyleType = !active ? `${styles.main} pt-30` : null;
  const titleStyleType = !active ? styles.title : null;

  const Card = () => {
    if (!item) {
      return(
        <div className={styles.card}>
          <h2 className={`${titleStyleType} text text_type_main-large mt-10`}>Загрзука</h2>
        </div>
      )
    } else {
    return (
      <div className={styles.card}>
        <h2 className={`${titleStyleType} text text_type_main-large mt-10`}>Детали ингридиента</h2>
        <img src={item.image_large} className={styles.image}/>
        <h3 className={`${modal.text} text_type_main-medium text mt-4`}>{item.name}</h3>
        <div className={`${modal.row} mt-8 mb-15`}>
          <DiscribeBlock text='Калории,ккал' digits={item.calories} />
          <DiscribeBlock text='Белки, г' digits={item.proteins} />
          <DiscribeBlock text='Жиры, г' digits={item.fat} />
          <DiscribeBlock text='Углеводы, г' digits={item.carbohydrates} />
        </div>
      </div>
    )}
  }

  const ModalIngredient = () => {
    return (
      <Modal id={id} active={active} handleClose={handleClose}>
        <Card mainStyle='mr-15 ml-15' />
      </Modal>
    )
  }
  
  return (
    <div className={cardStyleType}>
    {
      active
      ? <ModalIngredient />
      : <Card />

    }
    </div>
  )
}