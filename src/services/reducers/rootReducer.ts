import { allIngredients } from "./allIngredientsReducer"
import { combineReducers } from 'redux';
import { burgerIngReducer } from "./burgerIngReducers";
import { modalReducer } from "./modalReducer";
import { tabsReducer } from "./tabsReducer";
import { registrationReducer } from "./registrationReducer";
import { loginReducer } from "./loginReducer";
import { loginUpdateReducer } from "./loginUpdateReducer";
import { userReducer } from "./userReducer";
import { feedReducer } from "./feedReducer";
import { ordersReducer } from "./ordersReducer";
import { orderReducer } from "./createOrderReducer";

export const rootReducer = combineReducers({
  allIngredients,
  burgerIng: burgerIngReducer,
  order: orderReducer,
  modal: modalReducer,
  tabs: tabsReducer,
  registration: registrationReducer,
  login: loginReducer,
  loginUpdate: loginUpdateReducer,
  user: userReducer,
  ordersFeed: feedReducer,
  profileOrders: ordersReducer
})