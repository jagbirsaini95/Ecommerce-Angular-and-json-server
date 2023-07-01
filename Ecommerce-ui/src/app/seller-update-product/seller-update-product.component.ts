import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-types';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  product: undefined | product;
  updateProductMsg: string;
  count = 5;
  toastMsg = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('id');
    this.productService.getProduct(productId).subscribe((res) => {
      if (res) {
        this.product = res;
      }
    });
  }

  onClickUpdateProduct(data: product) {
    data.id = this.product.id;
    this.productService.updateProduct(data).subscribe((res) => {
      if (res) {
        this.updateProductMsg = 'Product data updated successfully';
        this.toastMsg = true;
        setInterval(() => {
          if (this.count > 0) {
            this.count -= 1;
          }
        }, 1000);
      } else {
        this.updateProductMsg = 'Unable to update data internal error';
      }
    });
    setTimeout(() => {
      this.updateProductMsg = '';
      this.router.navigate(['seller-home']);
      this.toastMsg = false;
    }, 5000);
  }
}
