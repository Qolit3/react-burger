import { TIngredientKeyOrder } from "../../types-and-interfacese/types"
import { 
  ADD_BURGER_INGREDIENTS, 
  CLEAR_BURGER_INGREDIENTS, 
  REMOVE_BURGER_INGREDIENTS,
  SET_TOTAL_PRICE,
  TBurgerIngActions
} from "../actions/burger-ing-actions"

export type TBurgerIngState ={
  readonly burgerIngredients: TIngredientKeyOrder[];
  readonly totalPrice: number;
}

const initialstate: TBurgerIngState = {
  burgerIngredients: [],
  totalPrice: 0
}



export const burgerIngReducer = (state = initialstate, action: TBurgerIngActions): TBurgerIngState => {
  switch (action.type) {
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
      case CLEAR_BURGER_INGREDIENTS:
        return {
          ...state,
          burgerIngredients: []
        }
    default:
      return state
  }
}