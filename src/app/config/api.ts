import { environment } from "src/environments/environment";

//Check if the value of environment.production from 'environment.ts' is true. It is false by default
export const baseUrl = environment.production ? 'https://api.bcporcelain.com' : 'http://localhost:8000';
//export const productsUrl = baseUrl + '/products';
//export const cartUrl = baseUrl + '/cart';
