import { TOrderInFeed } from "../../types-and-interfacese/types";


export const FEED_CONNECT: 'FEED_CONNECT' = 'FEED_CONNECT';
export const FEED_DISCONNECT: 'FEED_DISCONNECT' = 'FEED_DISCONNECT';
export const FEED_CONNECTING: 'FEED_CONNECTING' = 'FEED_CONNECTING';
export const FEED_OPEN: 'FEED_OPEN' = 'FEED_OPEN';
export const FEED_CLOSE: 'FEED_CLOSE' = 'FEED_CLOSE';
export const FEED_MESSAGE: 'FEED_MESSAGE' = 'FEED_MESSAGE';
export const FEED_ERROR: 'FEED_ERROR' = 'FEED_ERROR';

export interface IFeedConnect {
  readonly type: typeof FEED_CONNECT ;
}

export interface IFeedDisconnect {
  readonly type: typeof FEED_DISCONNECT;
}

export interface IFeedConnecting {
  readonly type: typeof FEED_CONNECTING;
}

export interface IFeedOpen {
  readonly type: typeof FEED_OPEN;
}

export interface IFeedClose {
  readonly type: typeof FEED_CLOSE;
}

export interface IFeedMessage {
  readonly type: typeof FEED_MESSAGE;
  readonly data: {
    success: boolean;
    total: number;
    totalToday: number;
    orders: TOrderInFeed[];
  }
}

export interface IFeedError {
  readonly type: typeof FEED_ERROR;
  readonly error: string;
}

export type TFeedActions =
| IFeedConnect
| IFeedDisconnect
| IFeedConnecting
| IFeedOpen
| IFeedClose
| IFeedMessage
| IFeedError