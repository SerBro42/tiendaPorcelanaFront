import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from 'src/app/classes/categoria';
import { Product } from 'src/app/classes/product';
import { User } from 'src/app/shared/auth.service';
import { ProductCatService } from 'src/app/shared/product-cat.service';
import { environment } from 'src/environments/environment';

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
  ) {
    this.prodCatService.dropDownShow().subscribe((data: any) => {
      this.prodCategories = data;
    });
   }

  ngOnInit(): void {
  }

  getCategoryName(id: any) {
    let category = this.prodCategories.filter(function(item) {return item.id === id})[0];
    return category.nombre;
  }

}
