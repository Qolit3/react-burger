import { useSelector, useDispatch } from 'react-redux'
import { useDrag, useDrop } from "react-dnd/dist/hooks";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { ADD_BURGER_INGREDIENTS, REMOVE_BURGER_INGREDIENTS } from '../../services/actions/otherActions';
import styles from '../burger-constructor/burger-constructor.module.css'


export const ConstructorItem = ({ingredient, position}) => {
  const list = useSelector(state => state.other.burgerIngredients)
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: 'constructor',
    item: ingredient
  })

  const [{isHover}, dropTarget] = useDrop({
    accept: 'constructor',
    drop(item) {
      let newList = list;
      let change;
      change = ingredient.order;
      console.log(item.order);
      console.log(ingredient.order);
      newList[list.findIndex(obj => obj.order === ingredient.order)].order = item.order;
      newList[list.findIndex(obj => obj.order === item.order)].order = change;
      console.log(item.order);
      console.log(ingredient.order);
      dispatch({
        type: ADD_BURGER_INGREDIENTS,
        ingredients: newList
      })
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  })


  if(ingredient.type === 'bun') {
    if(position === 'top') {
      return (
        <div  key={ingredient._id}  className={`${styles.ingredient}`}>
          <ConstructorElement type="top" text={`${ingredient.name} (верх)`} thumbnail={ingredient.image} price={ingredient.price} isLocked={true}/>
        </div>
      )
    } else {
      return (
        <div  key={ingredient._id+1}  className={`${styles.ingredient} mt-4`}>
          <ConstructorElement type="bottom" text={`${ingredient.name} (низ)`} thumbnail={ingredient.image} price={ingredient.price} isLocked={true}/>
        </div>
      )
    }
  } else {
    return (
      <div ref={dropTarget}  key={ingredient._id} >
        <div ref={dragRef} className={`${styles.ingredient} mt-4 ${isHover && styles.ingredient_hovered}`}>
        <DragIcon type="primary"/>
        <ConstructorElement text={ingredient.name} thumbnail={ingredient.image} price={ingredient.price} handleClose={() => {
          list.splice(list.findIndex(obj => obj._id === ingredient._id), 1)
          dispatch({
            type: REMOVE_BURGER_INGREDIENTS,
            ingredient: list
          })
        }}/>
        </div>
      </div>
    )
  }
}