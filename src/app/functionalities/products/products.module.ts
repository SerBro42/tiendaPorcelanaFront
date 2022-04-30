import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipe } from 'src/app/pipes/product-filter.pipe';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductFilterPipe,
  ],
  imports: [
    CommonModule,
    ProductCardModule,
    FormsModule
  ]
})
export class ProductsModule {}
