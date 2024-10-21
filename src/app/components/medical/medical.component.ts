import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';
import { LoadingComponent } from '../loading/loading.component';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-medical',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    ReactiveFormsModule
  ],
  templateUrl: './medical.component.html',
  styleUrl: './medical.component.css'
})
export class MedicalComponent {
  @Input() id!:string;
  @Input() medicals: any;

  @Output() update = new EventEmitter<void>();

  @ViewChild('closebutton') closebutton: any;

  medicalForm: FormGroup;
  public types: any;
  private typesId: any;
  public isLoading: boolean = false;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder,
    private notify: NotificationService
  ) {
    this.medicalForm = this.formBuild.group({
      type: [''],
      date: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
    this.isister.getMedicalTypes().subscribe({
      next:(data:any) => {
        let array: any[] = [];
        data.forEach((type:any) => {
          let name = JSON.parse(type.name);
          type.name = name.es;
          array[name.es] = type.id;
        })
        this.types = data;
        this.typesId = array;
      },
      error:(error) => {
        console.log(error.status);
      }
    });
  }

  addMedical(): void {
    if(this.medicalForm.invalid) return;

    const object:any = {
      type: this.typesId[this.medicalForm.value.type],
      date: this.medicalForm.value.date,
      description: this.medicalForm.value.description
    }
    this.isLoading = true;

    this.isister.addMedical(object, this.id).subscribe({
      next:(data:any) => {
        this.isLoading = false;
        this.closebutton.nativeElement.click();
        this.notify.setAlert('Prueba medica añadida','success');
        this.update.emit();
      },
      error:(error) => {
        this.isLoading = false;
        this.notify.setAlert('No se ha podido añadir','danger');
      }
    })
  }
}
