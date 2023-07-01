import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { cart, checkoutDetails, order, product } from "../data-types";

@Injectable()
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) { }

  addProduct(data: product) {
    return this.http.post("http://localhost:3000/products", data);
  }
  productList() {
    return this.http.get<product[]>("http://localhost:3000/products");
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product: product) {
    return this.http.put(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  popularProducts() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=3`);
  }
  trendyProducts() {
    // return this.http.get<product[]>(`http://localhost:3000/products?_limit=8`); //for limit
    return this.http.get<product[]>(`http://localhost:3000/products`);
  }
  searchProduct(search: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${search}&_limit=5`
    );
  }
  addToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem("localCart");

    if (!localCart) {
      localStorage.setItem("localCart", JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem("localCart", JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
  removeItemFromCart(productId: number) {
    let localCart = localStorage.getItem('localCart');
    let items = localCart && JSON.parse(localCart);
    items = items && items.filter((item: product) => productId !== item.id)
    localStorage.setItem("localCart", JSON.stringify(items));
    this.cartData.emit(items);
  }
  addToCartUserLoggedIn(cartData: cart) {
    return this.http.post(`http://localhost:3000/cart`, cartData);
  }
  getCartList(userId: number) {
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=` + userId, { observe: 'response' }).subscribe((res) => {
      if (localStorage.getItem("user") && res && res.body) {
        this.cartData.emit(res.body);
      }
    });
  }
  removeFromUserCart(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`);
  }
  getUserCartList(userId: number) {
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userId);
  }
  checkoutOrder(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }
  getMyOrders(userId: number) {
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userId);
  }
  removeCartList(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/` + cartId, { observe: 'response' }).subscribe((res) => {
      if (localStorage.getItem("user") && res) {
        this.cartData.emit([]);
      }
    });
  }
  cancelOrder(orderId: number) {
    return this.http.delete('http://localhost:3000/orders/' + orderId);
  }
}
