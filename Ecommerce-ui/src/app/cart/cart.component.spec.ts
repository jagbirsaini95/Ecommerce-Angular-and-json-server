import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let productServiceSpy, routerSpy, productService, router;
  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj(ProductService, ['getUserCartList']);
    routerSpy = jasmine.createSpyObj(Router, ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [FormsModule],
      providers: [{ ProductService, useValue: productServiceSpy }, { Router, useValue: routerSpy }, HttpClient]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProductListing', () => {
  })

  it('should call checkout', () => {
    component.checkout();
  })
});
