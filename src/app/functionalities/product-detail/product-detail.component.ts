import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/classes/categoria';
import { Product } from 'src/app/classes/product';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/shared/auth.service';
import { ProductCatService } from 'src/app/shared/product-cat.service';
import { ProductsService } from 'src/app/shared/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!: Product;
  UserProfile!: User;
  prodCategories: Categoria[] = [];
  imagePath: any = environment.apiUrl+'/storage/images/';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    public prodCatService: ProductCatService,
    public productsService: ProductsService,
    ) {
      this.authService.profileUser().subscribe((data: any) => {
        this.UserProfile = data;
      });
      this.prodCatService.dropDownShow().subscribe((data: any) => {
        this.prodCategories = data;
      });
    }

  ngOnInit(): void {
    console.log(
      'Activated route data in Component:::',
      this.route.data
    );
    this.route.data.subscribe((response: any) => {
      console.log('PRODUCT FETCHING', response);
      this.product = this.route.snapshot.data['product'];
      console.log(this.product);
      console.log('Product fetched');
    })
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  getCategoryName(id: any) {
    let category = this.prodCategories.filter(function(item) {return item.id === id})[0];
    return category.nombre;
  }

  deleteProduct(){
    if(confirm('Are you sure you want to delete '+this.product.nombre+'?')) {
      console.log("Deleting product...");
      this.productsService.deleteProduct(this.product.id!).subscribe( ()=> this.router.navigate(['/products']),
      error => console.error(error));
    }
  }

}
