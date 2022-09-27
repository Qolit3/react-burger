import {
  ADD_BURGER_INGREDIENTS,
  REMOVE_MODAL_INGREDIENT,
  SET_MODAL_INGREDIENT } from "../actions/otherActions"

const initialstate = {
  burgerIngredients: [],

  modalIngredient: {},
  modalStatus: false
}



export const otherReducers = (state = initialstate, action) => {
  console.log(state.burgerIngredients)
  switch(action.type) {
    case ADD_BURGER_INGREDIENTS: 
    console.log(state)
    console.log(action.ingredients)
    return {
      ...state,
      burgerIngredients: state.burgerIngredients.push(action.ingredients)
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