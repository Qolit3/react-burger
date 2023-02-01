import { TOrderInFeed } from "../../types-and-interfacese/types";


export const ORDERS_CONNECT: 'ORDERS_CONNECT' = 'ORDERS_CONNECT';
export const ORDERS_DISCONNECT: 'ORDERS_DISCONNECT' = 'ORDERS_DISCONNECT';
export const ORDERS_CONNECTING: 'ORDERS_CONNECTING' = 'ORDERS_CONNECTING';
export const ORDERS_OPEN: 'ORDERS_OPEN' = 'ORDERS_OPEN';
export const ORDERS_CLOSE: 'ORDERS_CLOSE' = 'ORDERS_CLOSE';
export const ORDERS_MESSAGE: 'ORDERS_MESSAGE' = 'ORDERS_MESSAGE';
export const ORDERS_ERROR: 'ORDERS_ERROR' = 'ORDERS_ERROR';

export interface IOrdersConnect {
  readonly type: typeof ORDERS_CONNECT;
  readonly token: string;
}

export interface IOrdersDisconnect {
  readonly type: typeof ORDERS_DISCONNECT;
}

export interface IOrdersConnecting {
  readonly type: typeof ORDERS_CONNECTING;
}

export interface IOrdersOpen {
  readonly type: typeof ORDERS_OPEN;
}

export interface IOrdersClose {
  readonly type: typeof ORDERS_CLOSE;
}

export interface IOrdersMessage {
  readonly type: typeof ORDERS_MESSAGE;
  readonly data: {
    success: boolean;
    total: number;
    totalToday: number;
    orders: TOrderInFeed[];
  }
}

export interface IOrdersError {
  readonly type: typeof ORDERS_ERROR;
  readonly error: string;
}

export type TOrdersActions =
| IOrdersConnect
| IOrdersDisconnect
| IOrdersConnecting
| IOrdersOpen
| IOrdersClose
| IOrdersMessage
| IOrdersError