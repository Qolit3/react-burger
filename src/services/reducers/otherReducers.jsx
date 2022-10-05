import {
  ADD_BURGER_INGREDIENTS,
  CHANGE_BUNS_TAB_POSITION,
  CHANGE_MAINS_TAB_POSITION,
  CHANGE_ORDER,
  CHANGE_SAUCES_TAB_POSITION,
  REMOVE_BURGER_INGREDIENTS,
  REMOVE_MODAL_INGREDIENT,
  SET_MODAL_INGREDIENT } from "../actions/otherActions"

const initialstate = {
  burgerIngredients: [],

  modalIngredient: {},
  modalStatus: false,

  bunsTabPos: null,
  mainsTabPos: null,
  saucesTabPos: null,
}



export const otherReducers = (state = initialstate, action) => {
  switch(action.type) {
    case ADD_BURGER_INGREDIENTS: 
    return {
      ...state,
      burgerIngredients: action.ingredients
    }
    case REMOVE_BURGER_INGREDIENTS:
      return {
        ...state,
        burgerIngredients: action.ingredient
      }
    case CHANGE_BUNS_TAB_POSITION:
      return {
        ...state,
        bunsTabPos: action.pos
      }
    case CHANGE_SAUCES_TAB_POSITION:
      return {
        ...state,
        saucesTabPos: action.pos
      }
    case CHANGE_MAINS_TAB_POSITION:
      return {
        ...state,
        mainsTabPos: action.pos
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