import styles from '../../components/app/app.module.css'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet } from 'react-router-dom';

export const Constructor = () => {
  return (
    <div className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </DndProvider>
      <Outlet />
    </div>    
  )
} 