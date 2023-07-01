import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-types';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts: product[];
  trendyProducts: product[];
  showRemoveCart: boolean = false;
  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
    this.productService.popularProducts().subscribe((res) => {
      if (res) {
        this.popularProducts = res;
      }
    })

    this.productService.trendyProducts().subscribe((res) => {
      if (res) {
        this.trendyProducts = res;
      }
    })
  }
  //add and remove pending for implemetation
  addToCart() {
    console.log("add to cart");

  }
  removeFromCart(id: number) {
    console.log("remove from cart", id);

  }

}