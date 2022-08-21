import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Customer } from 'src/app/shared/types';

@Component({
  selector: 'tr[app-customer-row]',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit {
  edit = false;
  valid = true;
  showNotification = false;
  @Input() customerInfo!: Customer;
  @Input() index!: number;

  @Output() deleteClicked = new EventEmitter<Customer>();
  @Output() editClicked = new EventEmitter<Customer>();

  @ViewChild('ln') lastName!: ElementRef;
  @ViewChild('ph') phone!: ElementRef;
  @ViewChild('em') email!: ElementRef;
  @ViewChild('fn') firstName!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onDelete() {
    this.showNotification = true;
  }
  deleteCustomerInfo(state: boolean) {
    this.deleteClicked.emit(this.customerInfo);
    this.showNotification = state;
  }
  notificationClosed(state: boolean) {
    this.showNotification = state;
  }
  editCustomerInfo() {
    this.edit = true;
  }
  cancelEdit() {
    this.edit = false;
  }
  submitEdit() {
    this.editClicked.emit(this.customerInfo);
    this.edit = false;
  }

  checkValidEdit() {
    if (
      this.email.nativeElement.classList.contains('ng-valid') &&
      this.phone.nativeElement.classList.contains('ng-valid') &&
      this.firstName.nativeElement.classList.contains('ng-valid') &&
      this.lastName.nativeElement.classList.contains('ng-valid')
    )
      this.valid = true;
    else this.valid = false;
  }
}
