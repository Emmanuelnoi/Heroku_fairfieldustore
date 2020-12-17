import { Component, OnInit } from '@angular/core';
import {ProductOrders} from '../models/product-orders.model';
import {Subscription} from 'rxjs';
import {StoreService} from '../services/StoreService';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/User';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: ProductOrders;
  total: number;
  paid: boolean;
  public collapsed = true;
  orderFinished = false;
  UserSubscription: Subscription;


  currentUser: User;
  username: any;

  constructor(private storeService: StoreService, private router: Router, private authenticationService: AuthenticationService) {
    this.UserSubscription = this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.orders = this.storeService.ProductOrders;
  }

  ngOnInit(): void {
    this.username = this.authenticationService.currentUserValue.username.toLocaleUpperCase();
    this.paid = false;
    this.UserSubscription = this.storeService.OrdersChanged.subscribe( () => {
      this.orders = this.storeService.ProductOrders;

    });
    this.loadTotal();
  }

  pay() {
    this.paid = true;
    this.storeService.saveOrder(this.orders).subscribe();
  }

  loadTotal() {
    this.UserSubscription = this.storeService.TotalChanged.subscribe( () => {
      this.total = this.storeService.Total;
    });
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  logoutUser(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.UserSubscription.unsubscribe();
  }



}
