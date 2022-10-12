import { ADD_BURGER_INGREDIENTS, REMOVE_BURGER_INGREDIENTS, SET_TOTAL_PRICE } from "../actions/burgerIngActions"


const initialstate = {
  burgerIngredients: [],

  totalPrice: 0
}



export const burgerIngReducer = (state = initialstate, action) => {
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
    case SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.price
      }  
    default:
      return state
  }
}