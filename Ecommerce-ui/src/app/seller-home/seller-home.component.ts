import { Component, OnInit } from '@angular/core';
import { product } from '../data-types';
import { ProductService } from '../Services/product.service';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  removeProductMsg: undefined | string;
  removeProductIcon = faTrashCan;
  editProductIcon = faEdit;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.list();
  }
  removeProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((res) => {
      if (res) {
        this.removeProductMsg = 'Product Deleted Successfully';
        this.list();
      }
    });
    setTimeout(() => {
      this.removeProductMsg = undefined;
    }, 3000);
  }
  list() {
    this.productService.productList().subscribe((res) => {
      if (res) {
        this.productList = res;
      }
    });
  }
  updateProduct(id: number) {
    this.router.navigate([`seller-update-product/${id}`]);
  }
}
