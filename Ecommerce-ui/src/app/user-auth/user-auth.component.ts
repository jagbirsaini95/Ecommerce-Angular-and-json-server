import { Component } from "@angular/core";
import { cart, logIn, product, signUp } from "../data-types";
import { ProductService } from "../Services/product.service";
import { UserService } from "../Services/user.service";

@Component({
  selector: "app-user-auth",
  templateUrl: "./user-auth.component.html",
  styleUrls: ["./user-auth.component.css"],
})
export class UserAuthComponent {
  showLogin = true;
  authError: string = "";
  confirmPasswordError: string;
  constructor(private userService: UserService, private productService: ProductService) { }
  ngOnInit() {
    console.log("user");

    this.userService.reloadUser();
  }
  onUserSignUp(data: signUp) {
    console.log(data);

    if (data.password === data.cpassword) {
      this.userService.userSignUp(data);
    } else {
      this.confirmPasswordError = "Password and Confirm password should match";
    }
  }
  onUserLogin(data: logIn) {
    this.userService.userLogin(data);
    this.userService.isLoginError.subscribe((error) => {
      error ? (this.authError = "Inavlid Credentials") : this.localCartToDB();
    });
  }
  openSignup() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
  localCartToDB() {
    let localCart = localStorage.getItem('localCart');
    let items: product[] = localCart && JSON.parse(localCart);
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user)[0].id;
    items && items.forEach((item: product, index) => {
      let cartData: cart = {
        ...item,
        productId: item.id,
        userId,
      }

      delete cartData.id;
      setTimeout(() => {
        this.productService.addToCartUserLoggedIn(cartData).subscribe((res) => {
          console.log("added to cart ");
        })
      }, 500);
      if (items.length === index + 1) localStorage.removeItem('localCart');
    })
    // this.productService.(userId);
    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 2000);
  }
}
