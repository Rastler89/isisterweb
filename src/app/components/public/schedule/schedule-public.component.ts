import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CalendarComponent } from '../../calendar/calendar.component';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    CommonModule,
    CalendarComponent
  ],
  templateUrl: './schedule-public.component.html',
  styleUrl: './schedule-public.component.css'
})
export class ScheduleComponent {
  @Input() schedule: any;

  onDelete(event: any) {

  }
}
