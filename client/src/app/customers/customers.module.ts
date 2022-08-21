import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CustomerInfoComponent } from './customers/customer-info/customer-info.component';
import { CustomersComponent } from './customers/customers.component';

@NgModule({
  declarations: [CustomersComponent, CustomerInfoComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class CustomersModule {}
