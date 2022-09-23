import {
  GET_BURGER_INGREDIENTS,
  REMOVE_MODAL_INGREDIENT,
  SET_MODAL_INGREDIENT } from "../actions/otherActions"

const initialstate = {
  burgerIngredients: [],

  modalIngredient: {},
  modalStatus: false
}

export const otherReducers = (state = initialstate, action) => {
  
  switch(action.type) {
    case GET_BURGER_INGREDIENTS: 
    return {
      ...state,
      burgerIngredients: action.ingredients
    }
    case SET_MODAL_INGREDIENT:
      return {
        ...state,
        modalIngredient: action.object,
        modalStatus: true
      }
    case REMOVE_MODAL_INGREDIENT:
      return {
        ...state,
        modalIngredient: {},
        modalStatus: false
      }
      default:
        return state
  }
}