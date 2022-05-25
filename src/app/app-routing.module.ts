import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './functionalities/home/home.component';
import { ContactComponent } from './functionalities/contact/contact.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './functionalities/login/login.component';
import { ProductsComponent } from './functionalities/products/products.component';
import { ProductDetailComponent } from './functionalities/product-detail/product-detail.component';
import { ProductsResolverService } from './resolvers/products-resolver.service';
import { CartComponent } from './functionalities/cart/cart.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:'home'},
  { path: 'home', component: HomeComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'signup_in', component: LoginComponent},
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'products/:id',
    component: ProductDetailComponent,
    resolve: {product: ProductsResolverService}},
  { path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
