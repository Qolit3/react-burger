import {
  GET_ALL_INGREDIENTS,
  GET_ALL_INGREDIENTS_SUCCESS,
  GET_ALL_INGREDIENTS_FAILED 
} from '../actions/allIngredientsAction'

const initialstate = { 
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: []
}

export const allIngredients = (state = initialstate, action) => {
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