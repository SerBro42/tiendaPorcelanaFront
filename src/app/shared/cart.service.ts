import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  // Remove cart token from localStorage
  removeCartToken() {
    localStorage.removeItem('shopping_cart');
  }
}
