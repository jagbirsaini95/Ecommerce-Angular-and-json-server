import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { checkoutDetails } from '../data-types';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let productService: ProductService;
  let httpContoller: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [HttpClientTestingModule],
      providers: [ProductService, Router, HttpTestingController],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productService = TestBed.inject(ProductService);
    httpContoller = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'stub'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.deliveryCharges).toEqual(40);
  });

  it('should call handleCheckoutSubmit', () => {
    let inputData: checkoutDetails = {
      fname: 'fname',
      lname: 'lname',
      email: 'email@email.com',
      mobile: 145236985,
      locality: 'locality',
      address: 'address',
      city: 'city',
      state: 'state',
      pincode: 365214,
    }
    component.handleCheckoutSubmit(inputData);
  })

  it('should call getUserCartList', () => {
    productService.getUserCartList(1);
  })

});
