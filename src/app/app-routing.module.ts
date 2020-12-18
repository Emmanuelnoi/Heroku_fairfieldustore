import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import {ProductsComponent} from './products/products.component';
import {OrdersComponent} from './orders/orders.component';
import {StoreComponent} from './store/store.component';


const routes: Routes = [
  {path: 'store', component: StoreComponent},
  { path: '', component: LoginComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'orders', component: OrdersComponent},
  {path: '***', redirectTo: '/' }
];

export const routing = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export  class AppRoutingModule { }
