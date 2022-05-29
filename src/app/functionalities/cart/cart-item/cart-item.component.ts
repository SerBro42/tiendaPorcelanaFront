import { Component, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/classes/cartItem';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: any;
  @Output() cartItemDeleted: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  removeFromCart() {
    this.cartItemDeleted.emit(this.cartItem);

  }

}
