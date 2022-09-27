import React, { useEffect } from 'react';
import Header from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css'
import modal from '../modal/modal.module.css'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getAllIngredients } from '../../services/actions/allIngredientsAction';
import { REMOVE_MODAL_INGREDIENT } from '../../services/actions/otherActions';
import Modal from '../modal/modal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllIngredients())
  }, [])

  const closeModal = () => {
    dispatch({
      type: REMOVE_MODAL_INGREDIENT
    })
  }

  const item = useSelector(state => state.other.modalIngredient)

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </DndProvider>
      </div>
      <Modal handleClose={closeModal}>
        <div className="mr-15 ml-15">
          <h2 className="text text_type_main-large mt-10">Детали ингридиента</h2>
          <img src={item.image_large} />
          <h3 className={`${modal.text} text_type_main-medium text mt-4`}>{item.name}</h3>
          <div className={`${modal.row} mt-8 mb-15`}>
            <div>
              <p className={`${modal.text} text_type_main-default text text_color_inactive`}>Калории,ккал</p>
              <p className={`${modal.text} text_type_digits-default text text_color_inactive`}>{item.calories}</p>
            </div>
            <div>
              <p className={`${modal.text} text_type_main-default text text_color_inactive`}>Белки, г</p>
              <p className={`${modal.text} text_type_digits-default text text_color_inactive`}>{item.proteins}</p>
            </div>
            <div>
              <p className={`${modal.text} text_type_main-default text text_color_inactive`}>Жиры, г</p>
              <p className={`${modal.text} text_type_digits-default text text_color_inactive`}>{item.fat}</p>
            </div>
            <div>
              <p className={`${modal.text} text_type_main-default text text_color_inactive`}>Углеводы, г</p>
              <p className={`${modal.text} text_type_digits-default text text_color_inactive`}>{item.carbohydrates}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;