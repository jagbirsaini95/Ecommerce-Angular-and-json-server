import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { cart, priceSummary } from '../data-types';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  removeProductIcon = faTrashCan;
  cartData: cart[] | undefined;
  priceSumary: priceSummary = {
    price: 0,
    tax: 0,
    discount: 0,
    delivery: 0,
    total: 0,
  }
  constructor(private productService: ProductService, private router: Router) { }
  ngOnInit() {
    this.getProductListing();
  }

  getProductListing() {
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
      this.priceSumary.price = price;
      this.priceSumary.tax = (price / 100) * 9;
      this.priceSumary.discount = (price / 100) * 15;
      this.priceSumary.delivery = 40;
      this.priceSumary.total = this.priceSumary.price + this.priceSumary.tax + this.priceSumary.delivery - this.priceSumary.discount;
      if (!this.cartData.length) {
        this.router.navigate(['home']);
      }
    })
  }

  checkout() {
    this.router.navigate(["checkout"]);
  }

  removeProductFromCart(productId: number) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    this.productService.removeFromUserCart(productId).subscribe((res) => {
      if (res) {
        this.getProductListing();
        this.productService.getCartList(userId);
      }
    })
  }
}
