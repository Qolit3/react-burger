import { TIngredient } from "../../types-and-interfacese/types";


export const SET_MODAL_INGREDIENT: 'SET_MODAL_INGREDIENT' = 'SET_MODAL_INGREDIENT';
export const REMOVE_MODAL_INGREDIENT: 'REMOVE_MODAL_INGREDIENT' = 'REMOVE_MODAL_INGREDIENT';

export interface ISetModalIngredient {
  readonly type: typeof SET_MODAL_INGREDIENT;
  readonly object: TIngredient;
}

export interface IRemoveModalIngredient {
  readonly type: typeof  REMOVE_MODAL_INGREDIENT;
}

export type TModalActions = 
| ISetModalIngredient
| IRemoveModalIngredient