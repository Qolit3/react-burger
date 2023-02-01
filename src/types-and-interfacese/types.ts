import { TAllIngredientsActions } from "../services/actions/all-ingredients-action";
import { TBurgerIngActions } from "../services/actions/burger-ing-actions";
import { TCreateOrderActions } from "../services/actions/create-order-action";
import { TFeedActions } from "../services/actions/feed-actions";
import { TLoginActions } from "../services/actions/login-action";
import { TModalActions } from "../services/actions/modal-actions";
import { TOrdersActions } from "../services/actions/orders-actions";
import { TRegistrationActions } from "../services/actions/registration-action";
import { TTabsActions } from "../services/actions/tabs-actions";
import { TUpdateLoginActions } from "../services/actions/update-login-action";
import { TUserActions } from "../services/actions/user-action";

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

export type TApplicationActions = 
| TAllIngredientsActions
| TBurgerIngActions
| TCreateOrderActions
| TFeedActions
| TLoginActions
| TModalActions
| TOrdersActions
| TRegistrationActions
| TTabsActions
| TUpdateLoginActions
| TUserActions
