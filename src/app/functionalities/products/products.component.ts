import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from 'src/app/shared/products.service';
import { Product } from 'src/app/classes/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  files:any;
  submitted = false;
  data:any;
  form!: FormGroup;
  //post = new Post();


  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) { }



  filterNombre = "";

  ngOnInit(): void {
    this.products = this.productsService.getProductos();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
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
    formData.append("image", this.files, this.files.name);

    this.productsService.uploadData(formData).subscribe(res => {
      this.data = res;
      console.log(this.data);
    });
  }

  uploadImage(event: any) {
    this.files = event.target.files[0];
    console.log(this.files);
  }

}
