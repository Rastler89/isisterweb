import { Component, Input, ViewChild } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pet } from '../../interfaces/Pet';
import { IsisterService } from '../../_services/isister.service';

@Component({
  selector: 'app-walks',
  standalone: true,
  imports: [
    CalendarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './walks.component.html',
  styleUrl: './walks.component.css'
})
export class WalksComponent {
  @Input() id!:string;
  @ViewChild('closebutton') closebutton: any;

  walkForm: FormGroup;

  public pet: Pet;
  public walks: any;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder
  ) {
    this.pet = JSON.parse(localStorage.getItem('Pet')!);

    this.walkForm = this.formBuild.group({
      dayOfWeek: ['', Validators.required],
      time: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
    this.isister.getWalk(this.id).subscribe({
      next:(data:any) => {
        this.walks = data;
      }, 
      error: (error) => {
        console.log(error.status);
      }
    })
  }

  addWalk(): void {
    if(this.walkForm.invalid) return;

    const object:any = {
      DayOfWeek: this.walkForm.value.dayOfWeek,
      time: this.walkForm.value.time,
      description: this.walkForm.value.description
    }

    this.isister.addWalk(object,this.id).subscribe({
      next:(object:any) => {
        this.closebutton.nativeElement.click();
      },
      error:(error) => {
        console.log(error.status);
      }
    })
  }

  onDelete(object:any): void {
    let day = object[1];
    let hour = object[0];

    this.isister.deleteWalk(this.id,day,hour).subscribe({
      next:(object:any) => {
        this.walks = object;
      },
      error:(error) => {
        console.log(error);
      }
    })
  }
}
