import { ActionCreator } from "redux";

export const SUCCESSFUL_AUTHORIZATION: 'SUCCESSFUL_AUTHORIZATION' = 'SUCCESSFUL_AUTHORIZATION';
export const FAILED_AUTHORIZATION: 'FAILED_AUTHORIZATION' = 'FAILED_AUTHORIZATION';

export interface ISuccessfulAuthorization {
  readonly type: typeof SUCCESSFUL_AUTHORIZATION;
}

export interface IFailedAuthorization {
  readonly type: typeof FAILED_AUTHORIZATION;
}

export type TUserActions = 
| ISuccessfulAuthorization
| IFailedAuthorization

export const authSuccess: ActionCreator<ISuccessfulAuthorization> = () => {
  return  { type: SUCCESSFUL_AUTHORIZATION }
}

export const authFail: ActionCreator<IFailedAuthorization> = () => {
  return { type: FAILED_AUTHORIZATION }
}
