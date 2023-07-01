export interface signUp {
  name: string;
  email: string;
  password: string;
  cpassword: string;
}
export interface logIn {
  email: string;
  password: string;
}
export interface product {
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  imageURL: string;
  id: number;
  quantity: number | undefined;
  productId: undefined | number;
}
export interface cart {
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  imageURL: string;
  id: number | undefined;
  quantity: number | undefined;
  productId: number;
  userId: number;
}
export interface priceSummary {
  price: number;
  tax: number;
  discount: number;
  delivery: number;
  total: number;
}
export interface checkoutDetails {
  fname: string,
  lname: string,
  email: string,
  mobile: number,
  locality: string,
  address: string,
  city: string,
  state: string,
  pincode: number,
}
export interface order {
  fname: string,
  lname: string,
  email: string,
  mobile: number,
  locality: string,
  address: string,
  city: string,
  state: string,
  pincode: number,
  totalAmount: number,
  userId: number,
}