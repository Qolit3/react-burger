import { TIngredientKeyOrder } from "../../types-and-interfacese/types";


export const ADD_BURGER_INGREDIENTS: 'ADD_BURGER_INGREDIENTS' = 'ADD_BURGER_INGREDIENTS';
export const REMOVE_BURGER_INGREDIENTS: 'REMOVE_BURGER_INGREDIENTS' = 'REMOVE_BURGER_INGREDIENTS';
export const SET_TOTAL_PRICE: 'SET_TOTAL_PRICE' = 'SET_TOTAL_PRICE';
export const CLEAR_BURGER_INGREDIENTS: 'CLEAR_BURGER_INGREDIENTS' = 'CLEAR_BURGER_INGREDIENTS';

export interface IAddBurgerIngredients {
  readonly type: typeof ADD_BURGER_INGREDIENTS;
  readonly ingredients: TIngredientKeyOrder[];
}

export interface IRemoveBurgerIngredients {
  readonly type: typeof REMOVE_BURGER_INGREDIENTS;
  readonly ingredient: TIngredientKeyOrder[];
}

export interface ISetTotalPrice {
  readonly type: typeof SET_TOTAL_PRICE;
  readonly price: number;
}

export interface IClearBurgergIngredients {
  readonly type: typeof CLEAR_BURGER_INGREDIENTS;
}

export type TBurgerIngActions = 
| IAddBurgerIngredients
| IRemoveBurgerIngredients
| ISetTotalPrice
| IClearBurgergIngredients