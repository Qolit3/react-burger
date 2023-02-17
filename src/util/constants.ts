import { getCookie } from "./functions";

export const api: string = 'https://norma.nomoreparties.space/api';
export const bun: string = 'bun';

export const accessToken: string | undefined = getCookie('accessToken');
export const refreshToken: string | undefined = getCookie('refreshToken')