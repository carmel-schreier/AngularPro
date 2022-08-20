import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { AddCustomer, Customer, User } from 'src/app/shared/types';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers!: Array<Customer>;
  notValid = false;
  @Input() user!: User;
  added!: AddCustomer;

  addCustomerForm = new FormGroup({
    first_name: new FormControl('', {
      validators: Validators.required,
    }),
    last_name: new FormControl('', {
      validators: Validators.required,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', {
      validators: Validators.required,
    }),
  });

  onSubmit() {
    if (!this.addCustomerForm.valid) {
      this.notValid = true;
      return;
    }
    this.added = this.addCustomerForm.value;
    this.added.user_id = this.user.id;
    this.apiService.addCustomer(this.added).subscribe({
      next: (data: Customer) => {
        this.getCustomers(this.user);
      },
      error: (err) => console.error(err),
    });
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getCustomers(this.user);
  }

  getCustomers(user: User) {
    this.apiService.getCustomersDetails(user).subscribe({
      next: (data: Array<Customer>) => {
        this.customers = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete() {},
    });
  }

  deleteCustomer(customer: Customer) {
    let id = customer.id;
    this.apiService.deleteCustomer(customer.id);
    this.getCustomers(this.user);
  }
  editCustomer(customer: Customer) {
    this.apiService.editCustomerDetails(customer, customer.id).subscribe({
      next: (data: Customer) => {},
      error: (err) => {
        console.error(err);
      },
      complete() {},
    });
    this.getCustomers(this.user);
  }
}
