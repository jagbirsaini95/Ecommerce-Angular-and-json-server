import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { logIn, signUp } from "../data-types";
import { SellerService } from "../Services/seller.service";

@Component({
  selector: "app-seller-auth",
  templateUrl: "./seller-auth.component.html",
  styleUrls: ["./seller-auth.component.css"],
})
export class SellerAuthComponent implements OnInit {
  showLogin = false;
  authError: string = "";
  confirmPasswordError: string = "";

  constructor(private seller: SellerService) {}

  ngOnInit() {
    this.seller.reloadSeller();
  }
  onSignup(data: signUp): void {
    if (data.password === data.cpassword) {
      this.seller.sellerSignUp(data);
    } else {
      this.confirmPasswordError = "Password and Confirm password should match";
    }
  }
  onLogin(data: logIn): void {
    this.seller.sellerLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      isError ? (this.authError = "Invalid credentials") : "";
    });
  }
  openSignup() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
}
