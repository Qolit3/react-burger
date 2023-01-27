import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import Modal from "../../components/modal/modal";
import modal from '../../components/modal/modal.module.css'
import styles from './ingredientDetails.module.css'
import { REMOVE_MODAL_INGREDIENT } from "../../services/actions/modalActions";
import { useAppSelector } from "../..";
import { IIngredientDetailsProps } from '../../types_and_interfacese/interfaces';
import { TIngredient } from '../../types_and_interfacese/types';
import { DiscribeBlock } from '../../components/discibe-block/discrie-block';


export const IngredientDetails: FunctionComponent<IIngredientDetailsProps> = ({id}) => {
  const params = useParams();
  const {ingredients, active} = useAppSelector(store => ({
    ingredients: store.allIngredients.ingredients,
    active: store.modal.modalStatus
  }));
  const [item, setItem] = useState<TIngredient | undefined>(undefined);

  useEffect(() => {
    setItem(ingredients.find((item: TIngredient) => params.id === item._id));
  }, [ingredients, params])
  
  const cardStyleType: string | undefined = !active ? `${styles.main} pt-30` : undefined;
  const titleStyleType: string | undefined = !active ? styles.title : undefined;

  const Card: FunctionComponent = () => {
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

  const closeModal = () => {
    console.log('ПРОВЕРЬ INGREDIENTDETAILS');
  }

  console.log('ПРОВЕРЬ INGREDIENTDETAILS');
  const ModalIngredient = () => {
    return (
      <Modal id={id} active={active} handleClose={closeModal}>
        <Card /* mainStyle='mr-15 ml-15' */ />
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