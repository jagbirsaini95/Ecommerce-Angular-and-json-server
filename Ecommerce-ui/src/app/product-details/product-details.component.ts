import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { cart, product } from "../data-types";
import { ProductService } from "../Services/product.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent {
  productDetail: product;
  productQuantity: number = 1;
  minMaxProductTooltip: string = "Product buying limit is 1 to 20";
  showRemoveCart: boolean = false;
  userCartProducts: product | undefined;

  constructor(
    private productService: ProductService,
    private activatedroute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    let productId = this.activatedroute.snapshot.paramMap.get("id");
    productId &&
      this.productService.getProduct(productId).subscribe((res) => {
        this.productDetail = res;
        let localCart = localStorage.getItem('localCart');
        if (localCart && productId) {
          let items = JSON.parse(localCart);
          items = items && items.filter((item: product) => productId === item.id.toString())
          if (items.length) {
            this.showRemoveCart = true;
          }
          else {
            this.showRemoveCart = false;
          }
        }

        let user = localStorage.getItem('user');
        // console.log(user, "user");
        if (user) {

          let userId = user && JSON.parse(user)[0].id;
          this.productService.getCartList(userId);

          this.productService.cartData.subscribe((res) => {
            let item = res.filter((item: product) => item.productId?.toString() == productId?.toString())

            if (item.length) {
              this.userCartProducts = item[0];
              this.showRemoveCart = true
            }
          })
        }
      });

  }

  handleQuantity(val: string) {
    if (this.productQuantity === 20) {
      this.minMaxProductTooltip = "Maximum product buying limit is 20";
    }
    if (this.productQuantity === 1) {
      this.minMaxProductTooltip = "Minimum product buying limit is 1";
    }
    if (val == "plus" && this.productQuantity < 20) {
      this.productQuantity++;
      console.log(this.productQuantity);
    } else if (val === "minus" && this.productQuantity > 1) {
      this.productQuantity--;
    }
  }

  addToCart() {
    if (this.productDetail) {
      this.productDetail.quantity = this.productQuantity;
      if (!localStorage.getItem("user")) {
        this.productService.addToCart(this.productDetail);
        this.showRemoveCart = true
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)[0].id;
        let cartData: cart = {
          ...this.productDetail,
          productId: this.productDetail.id,
          userId,
        }

        delete cartData.id;
        this.productService.addToCartUserLoggedIn(cartData).subscribe((res) => {
          res && this.productService.getCartList(userId);
          this.showRemoveCart = true
        })
      }
    }
  }
  removeFromCart(productId: number) {
    if (!localStorage.getItem("user")) {
      this.productService.removeItemFromCart(productId);
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user)[0].id;
      this.productService.removeFromUserCart(this.userCartProducts.id).subscribe((res) => {
        if (res) {
          this.productService.getCartList(userId);
        }
      })
    }
    this.showRemoveCart = false;
  }
  buyNow() {
    this.router.navigate(['cart']);
  }

}
