import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!: Product;
  imagePath: any = environment.apiUrl+'/storage/images/';

  constructor(private router: Router,
              private route: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    //this.product = this.route.snapshot.data['product'];
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
