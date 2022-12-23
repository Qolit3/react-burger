import { allIngredients } from "./allIngredientsReducer"
import { order } from "./createOrderReducer";
import { combineReducers } from 'redux';
import { burgerIngReducer } from "./burgerIngReducers";
import { modalReducer } from "./modalReducer";
import { tabsReducer } from "./tabsReducer";
import { registrationReducer } from "./registrationReducer";
import { loginReducer } from "./loginReducer";
import { loginUpdateReducer } from "./loginUpdateReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  allIngredients,
  burgerIng: burgerIngReducer,
  order,
  modal: modalReducer,
  tabs: tabsReducer,
  registration: registrationReducer,
  login: loginReducer,
  loginUpdate: loginUpdateReducer,
  user: userReducer
})