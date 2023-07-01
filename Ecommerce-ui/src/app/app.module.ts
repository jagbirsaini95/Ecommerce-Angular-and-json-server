import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbAccordionModule, NgbCarousel, NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { AppComponent } from "./app.component";
import { SellerAuthComponent } from "./seller-auth/seller-auth.component";
import { SellerHomeComponent } from "./seller-home/seller-home.component";
import { SellerAddProductComponent } from "./seller-add-product/seller-add-product.component";
import { SellerService } from "./Services/seller.service";
import { ProductService } from "./Services/product.service";
import { AuthGuard } from "./Auth guard/auth.guard";
import { SellerUpdateProductComponent } from "./seller-update-product/seller-update-product.component";
import { InternalServerErrorComponent } from "./internal-server-error/internal-server-error.component";
import { SearchComponent } from "./search/search.component";
import { FooterComponent } from "./footer/footer.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { UserAuthComponent } from "./user-auth/user-auth.component";
import { UserService } from "./Services/user.service";
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  // {
  //   path: "**",
  //   component: InternalServerErrorComponent,
  // },
  {
    path: "internal-error",
    component: InternalServerErrorComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "seller-auth",
    component: SellerAuthComponent,
  },
  {
    path: "seller-home",
    component: SellerHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "seller-add-product",
    component: SellerAddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "seller-update-product/:id",
    component: SellerUpdateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "search/:searchitem",
    component: SearchComponent,
  },
  {
    path: "product-details/:id",
    component: ProductDetailsComponent,
  },
  {
    path: "user-auth",
    component: UserAuthComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    component: MyOrdersComponent,
    path: 'my-orders'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    // RouterModule.forRoot(routes, { useHash: true }), //use hash is used for issue of reloading with #/product-details/id
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    NgbCarousel,
    NgbAccordionModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    HomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    InternalServerErrorComponent,
    SearchComponent,
    FooterComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    CartComponent,
    CheckoutComponent,
    MyOrdersComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    SellerService,
    ProductService,
    UserService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }, //reloading issue of product-details/id
  ],
  // providers: [AuthGuard, SellerService, ProductService, UserService],
})
export class AppModule { }
