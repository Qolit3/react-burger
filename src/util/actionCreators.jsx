import { GET_ALL_INGREDIENTS_FAILED } from "../services/actions/allIngredientsAction";
import { GET_ORDER_FAILED } from "../services/actions/createOrderAction";
import { LOGIN_FAILED } from "../services/actions/loginAction";
import { REGISTRATION_FAILED } from "../services/actions/registrationAction";
import { LOGIN_UPDATE_FAILED } from "../services/actions/updateLoginAction";
import { FAILED_AUTHORIZATION, SUCCESSFUL_AUTHORIZATION } from "../services/actions/userAction";

export function getAllIngFail () {
  return { type: GET_ALL_INGREDIENTS_FAILED }
}

export function getOrderFail () {
  return { type: GET_ORDER_FAILED }
}

export function loginFail () {
  return { type: LOGIN_FAILED }
}

export function authFail () {
  return { type: FAILED_AUTHORIZATION }
}

export function registerFail () {
  return { type: REGISTRATION_FAILED }
}

export function loginUpdateFail () {
  return { type: LOGIN_UPDATE_FAILED }
}

export function authSuccess () {
  return  { type: SUCCESSFUL_AUTHORIZATION }
}