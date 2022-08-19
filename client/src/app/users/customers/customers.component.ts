import { ThisReceiver } from '@angular/compiler';
import {
  Component,
  OnInit,
  NgModule,
  ViewChild,
  Renderer2,
  ElementRef,
  Input,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { AuthService } from 'src/app/core/auth.service';
import { Customer, EditedCustomer, User } from 'src/app/shared/types';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers!: Array<Customer>;
  @Input() user!: User;

  addCustomerForm = new FormGroup({
    firstName: new FormControl('', {
      validators: Validators.required,
    }),
    lastName: new FormControl('', {
      validators: Validators.required,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', {
      validators: Validators.required,
    }),
  });

  onSubmit() {}

  constructor(
    private apiService: ApiService // private renderer: Renderer2, //private authService: AuthService, // private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomers(this.user);
  }

  getCustomers(user: User) {
    let user_id = user.id;
    this.apiService.getCustomersDetails(user).subscribe({
      next: (data: Array<Customer>) => {
        this.customers = data;
        console.log(this.customers);
      },
      error: (err) => {
        console.error(err);
      },
      complete() {},
    });
  }

  deleteCustomer(customer: Customer) {
    // let id = customer.id;
    //let theId = id.toString();
    console.log("i'm in delete, customer_id= " + customer.id);
    this.apiService.deleteCustomer(customer.id);
    //.subscribe({
    //next: (data) => {
    //this.customers = data;
    //console.log(this.customers);
    //return this.courses;
    // console.log(data);
    // },
    //error: (err) => {
    // console.error(err);
    // },
    //complete() {},
    // });

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
