import { REMOVE_MODAL_INGREDIENT, SET_MODAL_INGREDIENT } from "../actions/modalActions"

const initialstate = {
  modalIngredient: {},
  modalStatus: false
}

export const modalReducer = (state = initialstate, action) => {
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