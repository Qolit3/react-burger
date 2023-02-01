import { combineReducers } from "redux";
import { allIngredients } from "./all-ingredients-reducer";
import { burgerIngReducer } from "./burger-ing-reducers";
import { orderReducer } from "./create-order-reducer";
import { feedReducer } from "./feed-reducer";
import { loginReducer } from "./login-reducer";
import { loginUpdateReducer } from "./login-update-reducer";
import { modalReducer } from "./modal-reducer";
import { ordersReducer } from "./orders-reducer";
import { registrationReducer } from "./registration-reducer";
import { tabsReducer } from "./tabs-reducer";
import { userReducer } from "./user-reducer";

export const rootReducer = combineReducers({
  allIngredients: allIngredients,
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