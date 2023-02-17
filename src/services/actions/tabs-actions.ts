export const CHANGE_BUNS_TAB_POSITION: 'CHANGE_BUNS_TAB_POSITION' = 'CHANGE_BUNS_TAB_POSITION';
export const CHANGE_SAUCES_TAB_POSITION: 'CHANGE_SAUCES_TAB_POSITION' = 'CHANGE_SAUCES_TAB_POSITION';
export const CHANGE_MAINS_TAB_POSITION: 'CHANGE_MAINS_TAB_POSITION' = 'CHANGE_MAINS_TAB_POSITION';

export interface IChangeBunsTabPosition {
  readonly type: typeof CHANGE_BUNS_TAB_POSITION;
  readonly pos: number;
}

export interface IChangeSaucesTabPosition {
  readonly type: typeof CHANGE_SAUCES_TAB_POSITION;
  readonly pos: number;
}

export interface IChangeMainsTabPosition {
  readonly type: typeof CHANGE_MAINS_TAB_POSITION;
  readonly pos: number;
}

export type TTabsActions =
| IChangeBunsTabPosition
| IChangeMainsTabPosition
| IChangeSaucesTabPosition