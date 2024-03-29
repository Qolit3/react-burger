import { TIngredient } from "../../types-and-interfacese/types";
import { GET_ALL_INGREDIENTS, GET_ALL_INGREDIENTS_FAILED, GET_ALL_INGREDIENTS_SUCCESS, TAllIngredientsActions } from "../actions/all-ingredients-action";

export type TAllIngredientState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredients: TIngredient[];
}

const initialstate: TAllIngredientState = { 
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: []
}

export const allIngredients = (state = initialstate, action: TAllIngredientsActions): TAllIngredientState => {
  switch(action.type) {
    case GET_ALL_INGREDIENTS: {
      return {
          ...state,
          ingredientsRequest: true,
          ingredientsFailed: false

      }
    }
    case GET_ALL_INGREDIENTS_SUCCESS: {
      return {
        
          ...state,
          ingredientsRequest: false,
          ingredients: action.allIngredients
        
      }
    }
    case GET_ALL_INGREDIENTS_FAILED: {
      return {
        
          ...state,
          ingredientsRequest: false,
          ingredientsFailed: true
        
      }
    }
    default: 
      return state
  }
} 