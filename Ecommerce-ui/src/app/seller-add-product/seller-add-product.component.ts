import { Component, OnInit } from '@angular/core';
import { product } from '../data-types';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMsg: string;
  constructor(private ProductService: ProductService) {}

  ngOnInit() {}
  onClickAddProduct(data: product) {
    this.ProductService.addProduct(data).subscribe((res) => {
      if (res) {
        this.addProductMsg = 'Product Added Sucessfully';
      }
      setTimeout(() => {
        this.addProductMsg = '';
      }, 3000);
    });
  }
}
