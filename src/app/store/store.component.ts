import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsComponent} from '../products/products.component';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';
import {OrdersComponent} from '../orders/orders.component';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {User} from '../models/User';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  public collapsed = true;
  orderFinished = false;

  @ViewChild('productsC')
  productsC: ProductsComponent;

  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent;

  @ViewChild('ordersC')
  ordersC: OrdersComponent;
  username: any;
  currentUser: User;
  UserSubscription: Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.UserSubscription = this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.username = this.authenticationService.currentUserValue.username.toLocaleUpperCase();
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }

  reset() {
    this.orderFinished = false;
    this.productsC.reset();
    this.shoppingCartC.reset();
    this.ordersC.paid = false;
  }
  logoutUser(){
    this.authenticationService.logout();
    this.router.navigate(['/']);
    this.UserSubscription.unsubscribe();
  }


}
