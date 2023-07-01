import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpContoller: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, HttpTestingController]
    });
    service = TestBed.inject(UserService);
    httpContoller = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call userSignUp service', () => {
    let inputData: any = {
      name: "User",
      email: "user@user.com",
      password: 'user',
    }
    service.userSignUp(inputData)
    // expect(service.userSignUp).toBeDefined();
  });

  it('should call reloadUser service', () => {
    service.reloadUser();
    localStorage.setItem("user", JSON.stringify({}));
    expect(localStorage.getItem("user")).toBeDefined();
  });

  it('should call userLogin service', () => {
    let inputData: any = {
      email: "user@user.com",
      password: 'user',
    }
    service.userLogin(inputData);
    // expect(service.userLogin).toBeDefined();
  });
});
