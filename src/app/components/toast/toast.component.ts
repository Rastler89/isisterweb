import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../_services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit {
  alert : any;
  timeoutId?: number;

  constructor(private notify: NotificationService) {}

  ngOnInit(): void {
    this.notify.getAlert().subscribe(alert => {
      this.alert = alert;
      this.resetTimer();
    })
  }

  resetTimer(): void {
    if(this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => {
      this.alert = undefined;
    }, 3000);
  }

  isType(type: string): boolean {
    return this.alert && this.alert.type == type;
  }
}
