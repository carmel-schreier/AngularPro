import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() headerLabel?: string;
  @Input() buttonLabel_1 = 'Cancel';
  @Input() buttonLabel_2 = 'OK';
  @Input() showNotification = false;

  @Output() buttonCancelClicked = new EventEmitter<boolean>();
  @Output() buttonOKClicked = new EventEmitter<boolean>();

  onCancelButtonClicked() {
    this.buttonCancelClicked.emit(false);
  }

  onOKButtonClicked() {
    this.buttonOKClicked.emit(false);
  }

  constructor() {}

  ngOnInit(): void {}
}
