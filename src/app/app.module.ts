import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {StoreService} from './services/StoreService';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {ErrorInterceptor} from './helper/error.interceptor';
import {JwtInterceptor} from './helper/jwt.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    ProductsComponent,
    OrdersComponent,
    ShoppingCartComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [StoreService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
