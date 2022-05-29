import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from 'src/app/classes/categoria';
import { Product } from 'src/app/classes/product';
import { User } from 'src/app/shared/auth.service';
import { ProductsService } from 'src/app/shared/products.service';
import { ProductCatService } from 'src/app/shared/product-cat.service';
import { environment } from 'src/environments/environment';
import { MessengerService } from 'src/app/shared/messenger.service';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('producto') data!: Product;
  @Input() userProfileRole?: number;
  prodCategories: Categoria[] = [];
  imagePath: any = environment.apiUrl+'/storage/images/';

  constructor(
    public prodCatService: ProductCatService,
    public productsService: ProductsService,
    private msg: MessengerService,
    private cartService: CartService,
  ) {
    this.prodCatService.dropDownShow().subscribe((data: any) => {
      this.prodCategories = data;
    });
   }

  ngOnInit(): void {
  }

  //temprarily unused function
  getCategoryName(id: any) {
    let category = this.prodCategories.filter(function(item) {return item.id === id})[0];
    return category.nombre;
  }

  addToCart(id: any) {
    //This function may not be working as intended (sending data to API), therefore
    //it is here only to provide product id for the console.log
    this.productsService.getAddToCart(id);
    console.log('Add to cart clicked :::', this.data);
    //New function. TO DO
    //this.cartService.addProductToCart(this.data).subscribe(() =>{
      this.msg.sendMsg(this.data);
    //})

  }

}
