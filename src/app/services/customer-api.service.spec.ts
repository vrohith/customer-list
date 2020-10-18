import { TestBed } from '@angular/core/testing';

import { CustomerApiService } from './customer-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CustomerApiService', () => {
  let service: CustomerApiService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [CustomerApiService]
    });
    service = TestBed.inject(CustomerApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should return an Observable<ICustomer[]>', () => {
    const dummyCustomer = [
      { id: 131, firstName: 'James', lastName: 'Collins', dob: '2020-10-22' },
      { id: 132, firstName: 'Julia', lastName: 'T', dob: '1990-10-10' }
    ];
    service.getCustomers().subscribe(customers => {
      expect(customers.length).toBe(2);
    });

    const req = httpMock.expectOne(`${service.customerUrl}`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyCustomer);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

