import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CalendarComponent } from "../calendar/calendar.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';
import { Pet } from '../../interfaces/Pet';
import { LoadingComponent } from '../loading/loading.component';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-diets',
  standalone: true,
  imports: [
    CalendarComponent,
    CommonModule,
    LoadingComponent,
    ReactiveFormsModule
  ],
  templateUrl: './diets.component.html',
  styleUrl: './diets.component.css'
})
export class DietsComponent {
  @Input() id!:string;
  @Input() diets: any | undefined;

  @Output() update = new EventEmitter<void>();

  @ViewChild('closebutton') closebutton: any;

  dietForm: FormGroup;

  public isLoading: boolean = false;
  public pet: Pet;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder,
    private notify: NotificationService
  ) {
    this.pet = JSON.parse(localStorage.getItem('Pet')!);

    this.dietForm = this.formBuild.group({
      dayOfWeek: ['',Validators.required],
      time: [''],
      description: ['']
    })
  }

  addDiet(): void {
    if(this.dietForm.invalid) return;

    const object:any = {
      DayOfWeek: this.dietForm.value.dayOfWeek,
      time: this.dietForm.value.time,
      description: this.dietForm.value.description
    }

    this.isLoading = true;

    this.isister.addDiet(object,this.id).subscribe({
      next:(object:any) => {
        this.isLoading = false;
        this.notify.setAlert('Dieta agregada','success');
        this.closebutton.nativeElement.click();
        this.update.emit();
      },
      error:(error) => {
        this.isLoading = false;
        this.notify.setAlert('Error desconocido, vuelva a intentar más tarde','danger');
      }
    })
  }

  onDelete(object:any): void {
    let day = object[1];
    let hour = object[0];

    this.isLoading = true;

    this.isister.deleteDiet(this.id,day,hour).subscribe({
      next:(object:any) => {
        this.diets = object;
        this.isLoading = false;
        this.notify.setAlert('Dieta eliminada','success');
        this.update.emit();
      },
      error:(error) => {
        this.isLoading = false;
        this.notify.setAlert('Error desconocido, vuelva a intentar más tarde','danger');
      }
    })
  }
}
