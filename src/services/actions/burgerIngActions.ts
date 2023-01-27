import { TIngredientKeyOrder } from "../../types_and_interfacese/types";

export const ADD_BURGER_INGREDIENTS: 'ADD_BURGER_INGREDIENTS' = 'ADD_BURGER_INGREDIENTS';
export const REMOVE_BURGER_INGREDIENTS: 'REMOVE_BURGER_INGREDIENTS' = 'REMOVE_BURGER_INGREDIENTS';
export const SET_TOTAL_PRICE: 'SET_TOTAL_PRICE' = 'SET_TOTAL_PRICE'

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

export type TBurgerIngActions = 
| IAddBurgerIngredients
| IRemoveBurgerIngredients
| ISetTotalPrice