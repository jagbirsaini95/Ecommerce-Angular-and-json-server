import { HttpClient } from "@angular/common/http";
import { SellerService } from "./seller.service"
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('seller service', () => {
    let service: SellerService;
    let httpClient: HttpClient;
    let httpContoller: HttpTestingController
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SellerService, HttpTestingController],
        })
    })

    it('should create seller service', () => {
        expect(service).toBeDefined();
    })

    it('should call sellerSignUp service', () => {
        let inputData: any = {
            name: "seller",
            email: "seller@seller.com",
            password: 'seller',
            cpassword: 'seller',
        }
        service.sellerSignUp(inputData)
    });

    it('should call reloadSeller service', () => {
        service.reloadSeller();
        localStorage.setItem("seller", JSON.stringify({}));
        expect(localStorage.getItem("seller")).toBeDefined();
    });

    it('should call sellerLogin service', () => {
        let inputData: any = {
            email: "user@user.com",
            password: 'user',
        }
        service.sellerLogin(inputData);
    });
})