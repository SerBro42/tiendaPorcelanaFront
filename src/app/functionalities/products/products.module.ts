import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';



@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductCardModule,
  ]
})
export class ProductsModule {}
