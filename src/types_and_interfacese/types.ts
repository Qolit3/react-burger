import { ReactNode } from "react";

export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
}

export type TIngredientKeyOrder = TIngredient & {
  key: string;
  order: number;
}

export type TBlock = {
  ingredientName: string;
  ingredients: TIngredient[] | [];
}

export type TOrderInFeed = {
  readonly ingredients: string[];
  readonly name: string;
  readonly _id: string;
  readonly status: string;
  readonly number: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}
