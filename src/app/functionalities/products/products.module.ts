import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipe } from 'src/app/pipes/product-filter.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductFilterPipe,
  ],
  imports: [
    CommonModule,
    ProductCardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule {}
