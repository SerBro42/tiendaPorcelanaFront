import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { MessengerService } from 'src/app/shared/messenger.service';
import { faCashRegister } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = <any>[
    //  { id: 1, productId: 1, productName: 'Test 1', qty: 4, price: 100},
    //  { id: 2, productId: 2, productName: 'Test 2', qty: 5, price: 50},
    //  { id: 3, productId: 3, productName: 'Test 3', qty: 3, price: 150},
    //  { id: 4, productId: 4, productName: 'Test 4', qty: 1, price: 200},

  ];

  cartTotal = 0;
  faCashRegister = faCashRegister;

  constructor(
    private msg: MessengerService
  ) {
    this.loadCartItems();
    this.totalCostCalculation();
  }

  ngOnInit() {
    this.handleSubscription();
    this.loadCartItems();
  }

  handleSubscription() {
    this.msg.getMsg().subscribe((product: any) => {
      console.log('Cart component receiving message :::',product);
      this.addProductToCart(product);
    })
  }

  totalCostCalculation() {
    this.cartItems.forEach((item: any) => {
      this.cartTotal += (item.qty * item.price)
    });
  }

  //In the tutorial, this method uses cartService.getCartItems() to retrieve cart items
  loadCartItems() {
    if (localStorage.getItem('shopping_cart') != null){
      this.cartItems = JSON.parse(localStorage.getItem('shopping_cart')!);
    };
  }

  addProductToCart(product:any) {

    let productExists = false;

    for(let i in this.cartItems) {
      if(this.cartItems[i].productId === product.id) {
        this.cartItems[i].qty++;
        productExists = true;
        break;
      }
    }

    if(!productExists) {
      this.cartItems.push({
        productId: product.id,
        productName: product.nombre,
        qty: 1,
        price: product.precio
      })
    }

    localStorage.setItem('shopping_cart', JSON.stringify(this.cartItems));
    let retrievedShoppingCart = localStorage.getItem('shopping_cart');
    console.log('Shopping cart: ', JSON.parse(retrievedShoppingCart!));

    //this.cartItems = JSON.parse(retrievedShoppingCart!);
  }

  onDeleteCartItem(event: any) {
    this.cartItems = this.cartItems.filter((item: any) => item !== event);
    localStorage.setItem('shopping_cart', JSON.stringify(this.cartItems));

  }
}
