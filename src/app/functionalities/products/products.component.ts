import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from 'src/app/shared/products.service';
import { Product } from 'src/app/classes/product';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { ProductCatService } from 'src/app/shared/product-cat.service';
import { User } from 'src/app/classes/user';
import { Categoria } from 'src/app/classes/categoria';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  prodCategories: Categoria[] = [];
  catSelected:Categoria=undefined!;
  files:any;
  submitted = false;
  data:any;
  form!: FormGroup;
  UserProfile!: User;


  constructor(
    private productsService: ProductsService,
    private productCatService: ProductCatService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public authService: AuthService
    ) {
      this.authService.profileUser().subscribe((data: any) => {
        this.UserProfile = data;
      });
     }

  filterNombre = "";

  ngOnInit(): void {
    //Esta función es para mostrar productos del array de productsService
    //this.products = this.productsService.getProductos();

    //Esta función es para mostrar los productos de la BD
     this.productsService.getProductosHTTP().subscribe(res =>{
       this.products = res;
     });
    this.productCatService.dropDownShow().subscribe(res => {
      this.prodCategories = res;
    });
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      prod_name: [null, Validators.required],
      cod_prod: [null, Validators.required],
      id_cat: [null, Validators.required],
      prod_desc: [null],
      image: [null, Validators.required]
    })
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append("prod_name", this.form.get('prod_name')?.value);
    formData.append("cod_prod", this.form.get('cod_prod')?.value);
    formData.append("id_cat", this.form.get('id_cat')?.value);
    formData.append("prod_desc", this.form.get('prod_desc')?.value);
    formData.append("image", this.files, this.files.name);

    this.productsService.uploadData(formData).subscribe(res => {
      this.data = res;
      console.log(this.data);
      //El siguiente toastr con if/else podría no estar funcionando
      if(this.data.status = true) {
        this.toastr.success(JSON.stringify(this.data.message), 'Product upload successful', {
          timeOut: 2000,
          progressBar: true
        })
      } else {
        this.toastr.error(JSON.stringify(this.data.message), '', {
          timeOut: 2000,
          progressBar: true
        })
      }
      // this.submitted = false;
      // this.form.reset();
    });
    this.submitted = false;
    this.form.reset();
    //Este toastr SÍ funciona
    this.toastr.success('Product uploaded successfully', '', {
      timeOut: 2000,
      progressBar: true
    });
  }

  uploadImage(event: any) {
    this.files = event.target.files[0];
    console.log(this.files);
  }

}
