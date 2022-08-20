import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerInfoComponent } from './customers/customer-info/customer-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsersComponent, CustomersComponent, CustomerInfoComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class UsersModule {}
