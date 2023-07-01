import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { checkoutDetails, order, product } from '../data-types';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalAmount: number | undefined;
  deliveryCharges: number = 40;
  cartData: product[] | undefined;

  constructor(private productService: ProductService, private router: Router) {

  }
  ngOnInit() {
    let userStore = localStorage.getItem('user')
    let userId = userStore && JSON.parse(userStore)[0].id
    this.productService.getUserCartList(userId).subscribe((res) => {
      this.cartData = res;
      let price = 0;
      res.forEach((product) => {
        if (product.quantity && product.price) {
          price = price + (+product.price * +product.quantity)
        }
      })
      this.totalAmount = price + (price / 100) * 9 - (price / 100) * 15;
    })
  }
  handleCheckoutSubmit(data: checkoutDetails) {
    let userData = localStorage.getItem('user');
    let userId = userData && JSON.parse(userData)[0].id;
    if (this.totalAmount) {
      let checkoutData: order = {
        ...data,
        totalAmount: this.totalAmount,
        userId,
      }

      this.cartData.forEach((item) => {
        this.productService.removeCartList(item.id)
      })
      this.productService.checkoutOrder(checkoutData).subscribe((res) => {
        if (res) {
          alert("order success")
          this.router.navigate(['my-orders'])
        }
      })
    }
  }

}
