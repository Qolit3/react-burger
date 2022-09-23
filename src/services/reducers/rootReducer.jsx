import { allIngredients } from "./allIngredientsReducer"
import { otherReducers } from "./otherReducers";
import { order } from "./createOrderReducer";
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  allIngredients,
  other: otherReducers,
  order
})