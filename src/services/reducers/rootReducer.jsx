import { allIngredients } from "./allIngredientsReducer"
import { order } from "./createOrderReducer";
import { combineReducers } from 'redux';
import { burgerIngReducer } from "./burgerIngReducers";
import { modalReducer } from "./modalReducer";
import { tabsReducer } from "./tabsReducer";

export const rootReducer = combineReducers({
  allIngredients,
  burgerIng: burgerIngReducer,
  order,
  modal: modalReducer,
  tabs: tabsReducer
})