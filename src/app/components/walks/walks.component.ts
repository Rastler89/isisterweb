import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pet } from '../../interfaces/Pet';
import { IsisterService } from '../../_services/isister.service';
import { LoadingComponent } from '../loading/loading.component';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-walks',
  standalone: true,
  imports: [
    CalendarComponent,
    CommonModule,
    LoadingComponent,
    ReactiveFormsModule
  ],
  templateUrl: './walks.component.html',
  styleUrl: './walks.component.css'
})
export class WalksComponent {
  @Input() id!:string;
  @Input() walks: any;

  @Output() update = new EventEmitter<void>();

  @ViewChild('closebutton') closebutton: any;

  walkForm: FormGroup;

  public pet: Pet;
  public isLoading: boolean = false;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder,
    private notify: NotificationService
  ) {
    this.pet = JSON.parse(localStorage.getItem('Pet')!);

    this.walkForm = this.formBuild.group({
      dayOfWeek: ['', Validators.required],
      time: [''],
      description: ['']
    })
  }

  addWalk(): void {
    if(this.walkForm.invalid) return;

    this.isLoading = true;

    const object:any = {
      DayOfWeek: this.walkForm.value.dayOfWeek,
      time: this.walkForm.value.time,
      description: this.walkForm.value.description
    }

    this.isister.addWalk(object,this.id).subscribe({
      next:(object:any) => {
        this.closebutton.nativeElement.click();
        this.isLoading = false;
        this.notify.setAlert('Rutina agregada','success');
        this.update.emit();
      },
      error:(error) => {
        this.isLoading = false;
        this.notify.setAlert('No se ha podido agregar','danger');
      }
    })
  }

  onDelete(object:any): void {
    let day = object[1];
    let hour = object[0];


    this.isister.deleteWalk(this.id,day,hour).subscribe({
      next:(object:any) => {
        this.walks = object;
        this.update.emit();
      },
      error:(error) => {
        console.log(error);
      }
    })
  }
}
