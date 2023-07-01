import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { logIn, product, signUp } from "../data-types";

@Injectable({
  providedIn: "root",
})
export class UserService {
  isLoginError = new EventEmitter<boolean>(false);
  cartData = new EventEmitter<[]>();

  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: signUp) {
    const postData = {
      email: data.email,
      password: data.password,
      name: data.name,
    };
    this.http
      .post("http://localhost:3000/users", postData, { observe: "response" })
      .subscribe((res) => {
        if (res) {
          localStorage.setItem("user", JSON.stringify(res.body));
          this.router.navigate(["home"]);
        }
      });
  }

  reloadUser() {
    if (localStorage.getItem("user")) {
      this.router.navigate(["home"]);
    }
  }

  userLogin(data: logIn) {
    this.http
      .get(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: "response" }
      )
      .subscribe((res: any) => {
        if (res && res.body && res.body.length !== 0) {
          localStorage.setItem("user", JSON.stringify(res.body));
          this.router.navigate(["home"]);
          this.isLoginError.emit(false);
        } else {
          this.isLoginError.emit(true);
        }
      });
  }
}
