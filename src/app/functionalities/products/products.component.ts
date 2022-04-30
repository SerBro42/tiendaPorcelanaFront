import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/products.service';
import { Product } from 'src/app/classes/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];


  constructor(private productsService: ProductsService) { }

  filterNombre = "";

  ngOnInit(): void {
    this.products = this.productsService.getProductos();
  }

}
