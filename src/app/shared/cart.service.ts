import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CartItem } from '../classes/cartItem';
import { environment } from 'src/environments/environment';
import { Product } from '../classes/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
  ) { }

  //TO DO: needs finishing the API url. Also, (pipe() and map()). This method appears not to be useful
  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(environment.apiUrl+'').pipe(
      map(result => {
        let cartItems: CartItem[] = [];

        for(let item of result) {
          let productExists = false;

          for(let i in cartItems) {
            if(cartItems[i].id_prod === item.id_prod.id) {
              cartItems[i].cantidad++;
              productExists = true;
              break;
            }
          }

          if(!productExists) {
            cartItems.push(new CartItem());
          }
        }

        return cartItems;
      })
    );
  }

  //TO DO: needs finishing the API url. This method appears not to be useful
  addProductToCart(product: Product): Observable<any> {
    return this.http.post(environment.apiUrl+'', {product});
  }

  // Remove cart token from localStorage
  removeCartToken() {
    localStorage.removeItem('shopping_cart');
  }
}
