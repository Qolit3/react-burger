import { TAllIngredientsActions } from "../services/actions/allIngredientsAction";
import { TBurgerIngActions } from "../services/actions/burgerIngActions";
import { TCreateOrderActions } from "../services/actions/createOrderAction";
import { TFeedActions } from "../services/actions/feedActions";
import { TLoginActions } from "../services/actions/loginAction";
import { TModalActions } from "../services/actions/modalActions";
import { TOrdersActions } from "../services/actions/ordersActions";
import { TRegistrationActions } from "../services/actions/registrationAction";
import { TTabsActions } from "../services/actions/tabsActions";
import { TUpdateLoginActions } from "../services/actions/updateLoginAction";
import { TUserActions } from "../services/actions/userAction";

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
