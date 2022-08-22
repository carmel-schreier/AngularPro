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
    this.apiService.addCustomer(this.added).subscribe({
      next: (data: Customer) => {
        this.getCustomers();
      },
      error: (err) => console.error(err),
    });
    this.addCustomerForm.reset();
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.apiService.getCustomersDetails().subscribe({
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
    this.apiService.deleteCustomer(customer.id);
    this.getCustomers();
  }
  editCustomer(customer: Customer) {
    this.apiService.editCustomerDetails(customer, customer.id).subscribe({
      next: (data: Customer) => {
        this.getCustomers();
      },
      error: (err) => {
        console.error(err);
      },
      complete() {},
    });
  }
}
