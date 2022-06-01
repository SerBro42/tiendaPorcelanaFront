import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  currentQty!: number;
  UserProfile!: User;
  prodCategories: Categoria[] = [];
  imagePath: any = environment.apiUrl+'/storage/images/';
  form!: FormGroup;
  submitted = false;
  data:any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    public prodCatService: ProductCatService,
    public productsService: ProductsService,
    private formBuilder: FormBuilder,
    ) {
      this.authService.profileUser().subscribe((data: any) => {
        this.UserProfile = data;
      });
      this.prodCatService.dropDownShow().subscribe((data: any) => {
        this.prodCategories = data;
      });
      this.createForm();
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
    });
    this.form.get('precio')?.setValue(this.product.precio);
    this.form.get('cantidad')?.setValue(this.product.cantidad);

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

  createForm() {
    this.form = this.formBuilder.group({
      precio: [null, Validators.required],
      cantidad: [null, Validators.required],
    })
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const prodId =this.product.id;
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append("precio", this.form.get('precio')?.value);
    formData.append("cantidad", this.form.get('cantidad')?.value);
    let updatedData: any = {
      "precio" : this.form.get('precio')?.value,
      "cantidad" : this.form.get('cantidad')?.value
    }


    this.productsService.setQuantity(prodId, updatedData).subscribe(res => {
      this.data = res;
      console.log(this.data);
      window.location.reload();
    });
    //this.router.navigate(['products/'+prodId]);
  }

}
