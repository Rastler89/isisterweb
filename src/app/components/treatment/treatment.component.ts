import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';
import { LoadingComponent } from '../loading/loading.component';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-treatment',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    ReactiveFormsModule
  ],
  templateUrl: './treatment.component.html',
  styleUrl: './treatment.component.css'
})
export class TreatmentComponent {
  @Input() id!: string;
  @Input() treatments: any;

  @Output() update = new EventEmitter<any>();

  @ViewChild('closebutton') closebutton: any;

  treatmentForm: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder,
    private notify: NotificationService
  ) {
    this.treatmentForm = this.formBuild.group({
      description: [''],
      repetition: [''],
      start: [''],
      end: ['']
    })
  }

  addTreatment(): void {
    if(this.treatmentForm.invalid) return;

    const object:any = {
      description: this.treatmentForm.value.description,
      repetition: this.treatmentForm.value.repetition,
      start: this.treatmentForm.value.start,
      end: this.treatmentForm.value.end
    }

    this.isLoading = true;

    this.isister.addTreatment(object,this.id).subscribe({
      next:(data:any) => {
        this.closebutton.nativeElement.click();
        this.isLoading = false;
        this.notify.setAlert('Tratamiento añadido','success');
        this.update.emit();
      },
      error:(error) => {
        console.log(error.status);
        this.isLoading = false;
        this.notify.setAlert('No se ha podido añadir','danger');
      }
    })
  }
}
