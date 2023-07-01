import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { logIn, signUp } from "../data-types";

@Injectable({
  providedIn: "root",
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  sellerSignUp(data: signUp) {
    const postData = {
      email: data.email,
      password: data.password,
      name: data.name,
    };
    this.http
      .post("http://localhost:3000/seller", postData, { observe: "response" })
      .subscribe((res) => {
        if (res) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem("seller", JSON.stringify(res.body));
          this.router.navigate(["seller-home"]);
        }
      });
  }
  reloadSeller() {
    if (localStorage.getItem("seller")) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(["seller-home"]);
    }
  }
  sellerLogin(data: logIn) {
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: "response" }
      )
      .subscribe((res: any) => {
        if (res && res.body && res.body.length !== 0) {
          this.isLoginError.emit(false);
          localStorage.setItem("seller", JSON.stringify(res.body));
          this.router.navigate(["seller-home"]);
        } else {
          this.isLoginError.emit(true);
        }
      });
  }
}
