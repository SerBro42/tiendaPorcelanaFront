import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { RouterModule, RouterLink } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [
    ProductCardComponent
  ],
  exports: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule
  ]
})
export class ProductCardModule { }
