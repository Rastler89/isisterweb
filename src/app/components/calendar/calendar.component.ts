import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  @Input() calendar!:any;
  @Output() delete = new EventEmitter<any>();
  @Input() public:boolean = false;
  
  deleteParent(id:any, id2: any) {
    let object = [id,id2];

    this.delete.emit(object);
  }
}
