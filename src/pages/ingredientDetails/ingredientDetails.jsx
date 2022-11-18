import { useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom"
import Modal from "../../components/modal/modal";
import modal from '../../components/modal/modal.module.css'
import styles from './ingredientDetails.module.css'


export const IngredientDetails = ({id, handleClose}) => {
  const { search } = useLocation();
  const params = useParams();
  const ingredients = useSelector(store => store.allIngredients.ingredients);
  const active = useSelector(state => state.modal.modalStatus)
  console.log(params)
  console.log(ingredients)
  console.log(active)
  const [item, setItem] = useState(undefined);
  

  useEffect(() => {
    setItem(ingredients.find((item) => params.id === item._id));
    console.log(item);
  }, [ingredients, params])

  const DiscribeBlock = ({text, digits}) =>{
    return (
      <div>
        <p className={`${modal.text} text_type_main-default text text_color_inactive`}>{text}</p>
        <p className={`${modal.text} text_type_digits-default text text_color_inactive`}>{digits}</p>
      </div>
    )
  }
  const cardStyleType = !search ? `${styles.main} pt-30` : null;
  const titleStyleType = !search ? styles.title : null;

  const Card = ({mainStyle = null}) => {
    if (!item) {
      return(
        <div className={mainStyle}>
          <h2 className={`${titleStyleType} text text_type_main-large mt-10`}>Загрзука</h2>
        </div>
      )
    } else {
    return (
      <div className={mainStyle}>
        <h2 className={`${titleStyleType} text text_type_main-large mt-10`}>Детали ингридиента</h2>
        <img src={item.image_large} />
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
      search
      ? <ModalIngredient />
      : <Card />

    }
    </div>
  )
}