import { Component, OnInit } from '@angular/core';

import { CustomerApiService } from '../services/customer-api.service';
import { ICustomer } from '../customer';
import { InMemoryDataService } from '../services/in-memory-data.service';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent implements OnInit {

  customers: ICustomer[];
  _listFilter: string;

  filteredCustomers: ICustomer[];
  date: Date;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCustomers=this.listFilter ? this.performFilter(this.listFilter) : this.customers;
  }
  
  constructor(private customerApi: CustomerApiService) { }

  ngOnInit(): void {
    this.customerApi.getCustomers()
    .subscribe(customer => {
      this.customers = customer;
      this.filteredCustomers = customer;
      console.log(this.customers)});
  }

  performFilter(filterBy: string): ICustomer[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.customers.filter((customer: ICustomer) => (customer.firstName +' ' + customer.lastName).toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
   
  // Add Customer
  addCustomer(firstName: string, lastName: string, dob: Date): void {
    if(firstName === '' || lastName === '' || !dob) {
      alert("Please Enter Required fields");
    }
  
    else {
      this.date=new Date();
      
      this.date.setFullYear(this.date.getFullYear() - 16);

      if(new Date(dob) > this.date) {
        alert("Customer should be 16 years or over");
      }
      else {
        firstName = firstName.trim();
        this.customerApi.addCustomer({ firstName, lastName, dob } as ICustomer)
          .subscribe(customer => {
            this.customers.push(customer);
          });
      }
    }
  }

  // Delete Customer
  delete(customer: ICustomer): void {
    this.customers = this.customers.filter(h => h !== customer);
    this.filteredCustomers = this.customers.filter(h => h !== customer);
    this.customerApi.deleteCustomer(customer).subscribe();
  }
}
