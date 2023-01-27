import { TIngredient } from "../../types_and_interfacese/types"
import {
  REMOVE_MODAL_INGREDIENT,
  SET_MODAL_INGREDIENT,
  TModalActions
} from "../actions/modalActions"

export type TModalState = {
  modalIngredient: {} | TIngredient;
  modalStatus: boolean;
}

const initialstate: TModalState = {
  modalIngredient: {},
  modalStatus: false
}

export const modalReducer = (state = initialstate, action: TModalActions): TModalState => {
  switch(action.type) {
    case SET_MODAL_INGREDIENT:
      return {
        ...state,
        modalIngredient: action.object,
        modalStatus: true
      }
    case REMOVE_MODAL_INGREDIENT:
      return {
        ...state,
        modalIngredient: {},
        modalStatus: false
      }
      default:
        return state
  }
}