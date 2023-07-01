import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { order } from '../data-types';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orderData: order[] | undefined;
  constructor(private productService: ProductService, private router: Router) {

  }
  ngOnInit() {
    this.getOrderList();
  }
  cancelOrder(orderId: number) {
    this.productService.cancelOrder(orderId).subscribe((res) => {
      if (res) {
        alert("order cancelled")
        this.getOrderList();
      }
    })
  }
  getOrderList() {
    let userData = localStorage.getItem('user');
    let userId = userData && JSON.parse(userData)[0].id;
    this.productService.getMyOrders(userId).subscribe((res) => {
      if (res) {
        this.orderData = res;
      }
      if (!this.orderData.length) {
        this.router.navigate(['home']);
      }
    })
  }
}
