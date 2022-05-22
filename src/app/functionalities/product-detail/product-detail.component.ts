import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!: Product;
  UserProfile!: User;
  imagePath: any = environment.apiUrl+'/storage/images/';

  constructor(private router: Router,
              private route: ActivatedRoute,
              public authService: AuthService
              ) {
                this.authService.profileUser().subscribe((data: any) => {
                  this.UserProfile = data;
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

  deleteProduct(){
    //this.eventosService.deleteEvento(this.evento.id!).subscribe( ()=> this.router.navigate(['/eventos']),
    //error => console.error(error));
  }

}
