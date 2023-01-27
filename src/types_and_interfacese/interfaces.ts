import React, { ReactElement, ReactNode } from "react";
import { TBlock, TIngredient, TIngredientKeyOrder, TOrderInFeed } from "./types";

export interface IIngredientProps {
  readonly ingredient: TIngredient 
}

export interface IIngredientsBlockProps {
  readonly block: TBlock;
  readonly id: number;
}

export interface IRenderAllIngredientsProps {
  readonly items: TBlock[];
}

export interface IRenderIngredientsProps {
  readonly list: TIngredientKeyOrder[]
}

export interface IConstructorItemProps {
  readonly ingredient: TIngredientKeyOrder;
  readonly position?: string
}

export interface IModalProps {
  readonly handleClose: () => void;
  readonly id: string;
  readonly active: boolean;
  readonly children: ReactNode;
}

export interface IModalOverlayProps {
  readonly handleClose: () => void;
  readonly id: string;
  readonly active: boolean;
  readonly children: ReactNode;
}

export interface IDescribeBlockProps {
  readonly text: string;
  readonly digits: number;
}

export interface IIngredientLineDescriptionProps {
  readonly id: string;
}

export interface IModalViewProps {
  readonly id: string;
}

export interface IOrderBlockProps {
  readonly item: TOrderInFeed;
}

export interface IProtectedRouteProps {
  readonly children?: ReactElement;
  readonly path: string;
  readonly isAuth: boolean;
}

export interface ILinkBlockProps {
  readonly item: TOrderInFeed;
  readonly to: string;
}

export interface IIngredientDetailsProps {
  readonly id: string;
}

export interface IOrderPageProps {
  readonly place?: boolean;
  readonly modal?: boolean;
}