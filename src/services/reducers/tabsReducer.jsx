import { CHANGE_BUNS_TAB_POSITION, CHANGE_MAINS_TAB_POSITION, CHANGE_SAUCES_TAB_POSITION } from "../actions/tabsActions"

const initialstate = {
  bunsTabPos: null,
  mainsTabPos: null,
  saucesTabPos: null,
}

export const tabsReducer = (state = initialstate, action) => {
  switch(action.type) {
    case CHANGE_BUNS_TAB_POSITION:
      return {
        ...state,
        bunsTabPos: action.pos
      }
    case CHANGE_SAUCES_TAB_POSITION:
      return {
        ...state,
        saucesTabPos: action.pos
      }
    case CHANGE_MAINS_TAB_POSITION:
      return {
        ...state,
        mainsTabPos: action.pos
      }
      default:
        return state
  }
}