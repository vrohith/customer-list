import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ICustomer } from '../customer';
import { CustomerApiService } from '../services/customer-api.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customer: ICustomer;
  date: Date;

  constructor(
    private route: ActivatedRoute,
    private customerApi: CustomerApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  // Get customer details that needs to be updated
  getCustomer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.customerApi.getCustomerbyId(id)
      .subscribe(customer => this.customer = customer);
  }

  goBack(): void {
    this.location.back();
  }

  // Save updates and go back
  save(): void {
    this.customerApi.updateCustomer(this.customer)
      .subscribe(() => this.goBack());
  }

  // Validate date input
  checkDate(event): void {
    this.date=new Date();
    this.date.setFullYear(this.date.getFullYear() - 16);

    if(new Date(event.target.value) > this.date) {
      alert("Please enter a valid Date of Birth");
    }
  }

}
