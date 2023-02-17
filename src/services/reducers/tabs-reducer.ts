import { CHANGE_BUNS_TAB_POSITION, CHANGE_MAINS_TAB_POSITION, CHANGE_SAUCES_TAB_POSITION, TTabsActions } from "../actions/tabs-actions";


export type TTabsState = {
  bunsTabPos: number;
  mainsTabPos: number;
  saucesTabPos: number;
}

const initialstate: TTabsState = {
  bunsTabPos: NaN,
  mainsTabPos: NaN,
  saucesTabPos: NaN,
}

export const tabsReducer = (state = initialstate, action: TTabsActions): TTabsState => {
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