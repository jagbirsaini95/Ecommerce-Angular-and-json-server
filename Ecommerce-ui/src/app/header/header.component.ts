import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { product } from "../data-types";
import { ProductService } from "../Services/product.service";
import { UserService } from "../Services/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  menuType: string = "default";
  sellerName: string;
  userName: string;
  searchProductResult: product[];
  searchValue: string;
  searchButtonDisable: boolean = true;
  cartItem: number = 0;

  constructor(private router: Router, private productService: ProductService, private userService: UserService) { }

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem("seller")) {
          let sellerStore = localStorage.getItem("seller");
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = "seller";
        } else if (localStorage.getItem("user")) {
          let userStore = localStorage.getItem("user");
          let userData = userStore && JSON.parse(userStore)[0];
          this.userName = userData.name;
          this.menuType = "user";
          this.productService.getCartList(userData.id);
        } else {
          this.menuType = "default";
        }
      }
    });
    let localCart = localStorage.getItem('localCart');
    this.cartItem = localCart && JSON.parse(localCart).length;
    this.productService.cartData.subscribe((res) => {
      if (res)
        this.cartItem = res.length;
    })

  }

  sellerLogout() {
    localStorage.removeItem("seller");
    this.menuType = "default";
    this.router.navigate(["home"]);
  }
  userLogout() {
    localStorage.removeItem("user");
    this.router.navigate(["home"]);
    this.productService.cartData.emit([])
  }
  inputSearchProducts(event: KeyboardEvent) {
    if (event) {
      this.searchValue = (event.target as HTMLInputElement).value;
      this.searchButtonDisable = false;
      this.productService.searchProduct(this.searchValue).subscribe((res) => {
        if (res.length > 0) {
          this.searchProductResult = res;
        } else {
          this.searchProductResult[0].name = "no result found";
        }
      });
    }
  }

  openDropdown() {
    this.productService
      .searchProduct(this.searchValue)
      .subscribe((res) => (this.searchProductResult = res));
  }
  closeDropdown() {
    this.searchProductResult = [];
    this.searchValue = '';
  }

  selectedSearchItem(id: number) {
    this.router.navigate([`/product-details/${id}`]);
  }
  submitSearchProducts(val: string) {
    this.router.navigate([`search/${val}`]);
  }
}
