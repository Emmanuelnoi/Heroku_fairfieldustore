import { Component, OnInit } from '@angular/core';
import {ProductOrders} from '../models/product-orders.model';
import {Product} from '../models/product.model';
import {ProductOrder} from '../models/product-order.model';
import {Subscription} from 'rxjs';
import {StoreService} from '../services/StoreService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  selectedProductOrder: ProductOrder;
  private shoppingCartOrders: ProductOrders;
  sub: Subscription;
  productSelected: boolean = false;

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.productOrders = [];
    this.loadProducts();
    this.loadOrders();
  }

  addToCart(order: ProductOrder) {
    this.storeService.SelectedProductOrder = order;
    this.selectedProductOrder = this.storeService.SelectedProductOrder;
    this.productSelected = true;
  }

  removeFromCart(productOrder: ProductOrder) {
    let index = this.getProductIndex(productOrder.product);
    if (index > -1) {
      this.shoppingCartOrders.productOrders.splice(
        this.getProductIndex(productOrder.product), 1);
    }
    this.storeService.ProductOrders = this.shoppingCartOrders;
    this.shoppingCartOrders = this.storeService.ProductOrders;
    this.productSelected = false;
  }

  getProductIndex(product: Product): number {
    return this.storeService.ProductOrders.productOrders.findIndex(
      value => value.product === product);
  }

  isProductSelected(product: Product): boolean {
    return this.getProductIndex(product) > -1;
  }

  loadProducts() {
    this.storeService.getAllProducts()
      .subscribe(
        (products: any[]) => {
          this.products = products;
          this.products.forEach(product => {
            this.productOrders.push(new ProductOrder(product, 0));
          });
        },
      (error) => console.log(error)
    );
  }

  loadOrders() {
    this.sub = this.storeService.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.storeService.ProductOrders;
    });
  }

  reset() {
    this.productOrders = [];
    this.loadProducts();
    this.storeService.ProductOrders.productOrders = [];
    this.loadOrders();
    this.productSelected = false;
  }

}
