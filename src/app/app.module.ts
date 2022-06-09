import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AsideComponent } from './components/aside/aside.component';

import { ContactModule } from './functionalities/contact/contact.module';
import { LoginModule } from './functionalities/login/login.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductsComponent } from './functionalities/products/products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductCardModule } from './components/product-card/product-card.module';
import { ProductsModule } from './functionalities/products/products.module';
import { ProductDetailComponent } from './functionalities/product-detail/product-detail.component';
import { CartComponent } from './functionalities/cart/cart.component';
import { CartItemComponent } from './functionalities/cart/cart-item/cart-item.component';
import { EditprofileComponent } from './functionalities/editprofile/editprofile.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    AsideComponent,
    ProductDetailComponent,
    CartComponent,
    CartItemComponent,
    EditprofileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContactModule,
    LoginModule,
    ProductsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    Title,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
