import { getCookie } from "./functions";

export const api = 'https://norma.nomoreparties.space/api';
export const bun = 'bun';

export const accessToken = getCookie('accessToken');
export const refreshToken = getCookie('refreshToken')