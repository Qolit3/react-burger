import { TIngredientKeyOrder } from "../../types_and_interfacese/types"
import { 
  ADD_BURGER_INGREDIENTS, 
  REMOVE_BURGER_INGREDIENTS,
  SET_TOTAL_PRICE,
  TBurgerIngActions
} from "../actions/burgerIngActions"
import { TCreateOrderState } from "./createOrderReducer";

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
    default:
      return state
  }
}