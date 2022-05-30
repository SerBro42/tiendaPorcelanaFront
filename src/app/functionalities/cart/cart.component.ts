import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { MessengerService } from 'src/app/shared/messenger.service';
import { faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/customer.service';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/shared/auth.service';
import { OrderService } from 'src/app/shared/order.service';
import { InvoiceRowService } from 'src/app/shared/invoice-row.service';

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
  UserProfile!: User;
  data:any;


  constructor(
    private msg: MessengerService,
    private toastr: ToastrService,
    private customerService: CustomerService,
    public authService: AuthService,
    public orderService: OrderService,
    private invoiceRowService: InvoiceRowService,

  ) {
    this.loadCartItems();
    this.totalCostCalculation();
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
    });
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
    window.location.reload();
  }


  makePurchase() {
    let customerIDtoSend: any = {
      "id_cliente" : this.UserProfile.id
    }
    //If the User was not a Customer, they become a Customer
    this.customerService.createCustomer(customerIDtoSend).subscribe(res => {
      console.log(res)
    });
    //Creation of an Order entity
    this.orderService.createOrder(customerIDtoSend).subscribe(res => {
      console.log(res)
    });
    //Check latest order ID, then insert invoice rows there
    let idUltimoPedido = 0;
    this.orderService.getLatestOrder().subscribe(res => {
      console.log('Latest order info: ',res)
      idUltimoPedido = res.id_pedido;
      console.log('id del pedido actual', idUltimoPedido);
      for (let i=0; i < retrievedShoppingCart.length; i++){
        let data: any = {
          "id_pedido": idUltimoPedido,
          "cantidad": retrievedShoppingCart[i].qty,
          "id_prod": retrievedShoppingCart[i].productId,
          "precio": retrievedShoppingCart[i].price
        }
        this.invoiceRowService.createInvoiceRow(data).subscribe(res => {
          console.log(res)
        })
      }
    });

    let retrievedShoppingCart = JSON.parse(localStorage.getItem('shopping_cart')!);
    console.log('Shopping cart being processed: ', retrievedShoppingCart);

    console.log(this.UserProfile.id);
    console.log(customerIDtoSend);

    this.toastr.success('Thank you for your purchase!', '', {
      timeOut: 2000,
      progressBar: true
    });
  }
}
