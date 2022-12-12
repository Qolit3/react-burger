import { useSelector, useDispatch } from 'react-redux'
import { useDrag, useDrop } from "react-dnd/dist/hooks";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from '../burger-constructor/burger-constructor.module.css'
import { ADD_BURGER_INGREDIENTS, REMOVE_BURGER_INGREDIENTS } from '../../services/actions/burgerIngActions';


export const ConstructorItem = ({ingredient, position}) => {
  const list = useSelector(state => state.burgerIng.burgerIngredients)
  const dispatch = useDispatch();
  /*

  Прошу прощения, упорно смотерл в другой компонент

  */

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
      console.log(ingredient.order);
      console.log(item.order);
      console.log(list.map(item => item.order))
      console.log(newList)
      //console.log(list.findIndex(obj => obj.order === ingredient.order))
      newList[ingredient.order].order = item.order;
      //console.log(newList[1].order)
      newList[item.order].order = change;
      //console.log(newList.map(item => item.order))
      newList.sort((a, b) => {
        if(a.order > b.order) return 1;
        if(a.order < b.order) return -1;
      })
      dispatch({
        type: ADD_BURGER_INGREDIENTS,
        ingredients: newList
      })
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  })

  
 if(!ingredient){
  return null
 }

  if(ingredient.type === 'bun') {
    if(position === 'top') {
      return (
        <div className={`${styles.ingredient}`}>
          <ConstructorElement type="top" text={`${ingredient.name} (верх)`} thumbnail={ingredient.image} price={ingredient.price} isLocked={true}/>
        </div>
      )
    } else {
      return (
        <div className={`${styles.ingredient} mt-4`}>
          <ConstructorElement type="bottom" text={`${ingredient.name} (низ)`} thumbnail={ingredient.image} price={ingredient.price} isLocked={true}/>
        </div>
      )
    }
  } else {
    return (
      <div ref={dropTarget}>
        <div ref={dragRef} className={`${styles.ingredient} mt-4 ${isHover && styles.ingredient_hovered}`}>
        <DragIcon type="primary"/>
        <ConstructorElement text={ingredient.name} thumbnail={ingredient.image} price={ingredient.price} handleClose={() => {
          
          list.splice(list.findIndex(obj => obj._id === ingredient._id), 1)
          for(let i = 1; i < list.length; i++) {
            list[i].order = i;
          }
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