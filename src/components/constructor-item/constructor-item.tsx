import { useDispatch } from 'react-redux'
import { useDrag, useDrop } from "react-dnd/dist/hooks";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from '../burger-constructor/burger-constructor.module.css'
import { ADD_BURGER_INGREDIENTS, REMOVE_BURGER_INGREDIENTS } from '../../services/actions/burgerIngActions';
import { useAppSelector } from '../..';
import { FunctionComponent } from 'react';
import { IConstructorItemProps } from '../../types_and_interfacese/interfaces';
import { TIngredient, TIngredientKeyOrder } from '../../types_and_interfacese/types';


export const ConstructorItem: FunctionComponent<IConstructorItemProps> = ({ingredient, position}) => {
  const list = useAppSelector(state => state.burgerIng.burgerIngredients)
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: 'constructor',
    item: ingredient
  })  

  const [{isHover}, dropTarget] = useDrop({
    accept: 'constructor',
    drop(item: TIngredientKeyOrder) {
      let newList = list;
      let change;
      change = ingredient.order;
      newList[ingredient.order].order = item.order;
      newList[item.order].order = change

      
      newList.sort((a: TIngredientKeyOrder, b: TIngredientKeyOrder) => {
        if(a.order > b.order) return 1;
        if(a.order < b.order) return -1;
        return 0
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
          
          list.splice(list.findIndex((obj: TIngredientKeyOrder) => obj._id === ingredient._id), 1)
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