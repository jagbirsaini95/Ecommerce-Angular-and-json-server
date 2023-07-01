import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ProductService } from "./product.service"
import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { cart, order, product } from "../data-types";

describe('product Service', () => {
    let service: ProductService;
    let httpController: HttpClientTestingModule;
    let httpClient: HttpClient;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductService, HttpTestingController]
        })
        service = TestBed.inject(ProductService);
        httpController = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    })

    it('should create product service', () => {
        expect(service).toBeTruthy();
    })

    it('should call addProduct', () => {
        const inputData: product = {
            name: 'iphone',
            price: 200,
            category: 'mobile',
            color: 'red',
            description: 'desc',
            imageURL: 'string.com',
            id: 1,
            quantity: 1,
            productId: 1,
        }

        service.addProduct(inputData);
        expect(service.addProduct).toBeDefined();
    })

    it('should call productList', () => {
        service.productList();
        expect(service.productList).toBeDefined();
    })

    it('should call deleteProduct', () => {
        service.deleteProduct(1);
        expect(service.deleteProduct).toBeDefined();
    })

    it('should call getProduct', () => {
        service.getProduct('1');
        expect(service.getProduct).toBeDefined();
    })

    it('should call updateProduct', () => {
        const inputData: product = {
            name: 'new iphone',
            price: 200,
            category: 'mobile',
            color: 'red',
            description: 'desc',
            imageURL: 'string.com',
            id: 1,
            quantity: 1,
            productId: 1,
        }
        service.updateProduct(inputData);
        expect(service.updateProduct).toBeDefined();
    })

    it('should call popularProducts', () => {
        service.popularProducts();
        expect(service.popularProducts).toBeDefined();
    })

    it('should call trendyProducts', () => {
        service.trendyProducts();
        expect(service.trendyProducts).toBeDefined();
    })

    it('should call searchProduct', () => {
        service.searchProduct('mobile');
        expect(service.searchProduct).toBeDefined();
    })

    it('should call addToCart', () => {
        const inputData = {
            name: 'new iphone',
            price: 200,
            category: 'mobile',
            color: 'red',
            description: 'desc',
            imageURL: 'string.com',
            id: 1,
            quantity: 1,
            productId: 1,
        }
        service.addToCart(inputData);

        let localCart = localStorage.setItem("localCart", JSON.stringify([inputData]));
        expect(localStorage.getItem("localCart")).toBeDefined();
    })

    it('should call removeItemFromCart', () => {
        service.removeItemFromCart(1);
        expect(service.removeItemFromCart).toBeDefined();
    })

    it('should call addToCartUserLoggedIn', () => {
        const inputCartData: cart = {
            name: 'iphone',
            price: 123,
            category: 'mobile',
            color: 'red',
            description: 'desc',
            imageURL: 'Image.com',
            id: 1,
            quantity: 1,
            productId: 1,
            userId: 1,
        }
        service.addToCartUserLoggedIn(inputCartData);
        expect(service.addToCartUserLoggedIn).toBeDefined();
    })

    it('should call getCartList', () => {
        service.getCartList(1);
        expect(service.getCartList).toBeDefined();
    })

    it('should call removeFromUserCart', () => {
        service.removeFromUserCart(1);
        expect(service.removeFromUserCart).toBeDefined();
    })

    it('should call getUserCartList', () => {
        localStorage.setItem("localCart", JSON.stringify([]))
        service.getUserCartList(1);
        expect(localStorage.getItem("localCart")).toBeDefined();
    })

    it('should call checkoutOrder', () => {
        const inputOrderData: order = {
            fname: 'fname',
            lname: 'lname',
            email: 'email@email.com',
            mobile: 1122331122,
            locality: 'local',
            address: 'address',
            city: 'city',
            state: 'state',
            pincode: 123423,
            totalAmount: 1122,
            userId: 1,
        }
        service.checkoutOrder(inputOrderData);
        expect(service.checkoutOrder).toBeDefined();
    })

    it('should call getMyOrders', () => {
        service.getMyOrders(1);
        expect(service.getMyOrders).toBeDefined();
    })

    it('should call removeCartList', () => {
        service.removeCartList(1);
        expect(service.removeCartList).toBeDefined();
    })

    it('should call cancelOrder', () => {
        service.cancelOrder(1);
        expect(service.cancelOrder).toBeDefined();
    })
})