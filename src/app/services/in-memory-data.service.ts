import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ICustomer } from '../customer';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const customers = [
      { id: 121, firstName: 'Sarah', lastName: 'Collins', dob: '2020-10-18' },
      { id: 122, firstName: 'Nick', lastName: 'T', dob: '1990-10-10' },
      { id: 123, firstName: 'Carlo', lastName: 'Smith', dob: '1998-2-19' },
      { id: 124, firstName: 'Jim', lastName: 'Smith', dob: '2000-8-21' },
      { id: 125, firstName: 'Tina', lastName: 'Rhea', dob: '2009-12-25' },
     
    ];
    return {customers};
  }

  
  genId(customers: ICustomer[]): number {
    return customers.length > 0 ? Math.max(...customers.map(customer => customer.id)) + 1 : 11;
  }
}