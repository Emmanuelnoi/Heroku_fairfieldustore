import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ProductOrders} from '../models/product-orders.model';
import {Subscription} from 'rxjs';
import {StoreService} from '../services/StoreService';
import {ProductOrder} from '../models/product-order.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/User';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  orderFinished: boolean;
  orders: ProductOrders;
  total: number;
  currentUser: User;
  sub: Subscription;

  @Output() onOrderFinished: EventEmitter<boolean>;

  constructor(private storeService: StoreService,
              private router: Router) {
    this.total = 0;
    this.orderFinished = false;
    this.onOrderFinished = new EventEmitter<boolean>();

  }

  ngOnInit() {
    this.orders = new ProductOrders();
    this.loadCart();
    this.loadTotal();
  }

  private calculateTotal(products: ProductOrder[]): number {
    let sum = 0;
    products.forEach(value => {
      sum += (value.product.price * value.quantity);
    });
    return sum;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  finishOrder() {
    this.orderFinished = true;
    this.storeService.Total = this.total;
    this.onOrderFinished.emit(this.orderFinished);
    this.router.navigate(['/orders']);
  }

  loadTotal() {
    this.sub = this.storeService.OrdersChanged.subscribe( () => {
      this.total = this.calculateTotal(this.orders.productOrders);
    });
  }

  loadCart() {
    this.sub = this.storeService.ProductOrderChanged.subscribe(() => {
      const productOrder = this.storeService.SelectedProductOrder;
      if (productOrder) {
        this.orders.productOrders.push(new ProductOrder(
          productOrder.product, productOrder.quantity));
      }
      this.storeService.ProductOrders = this.orders;
      this.orders = this.storeService.ProductOrders;
      this.total = this.calculateTotal(this.orders.productOrders);
    });
  }

  reset() {
    this.orderFinished = false;
    this.orders = new ProductOrders();
    this.orders.productOrders = [];
    this.loadTotal();
    this.total = 0;
  }

}
