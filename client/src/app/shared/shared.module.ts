import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [NotificationComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [NotificationComponent, HeaderComponent],
})
export class SharedModule {}
