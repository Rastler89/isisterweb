import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';

@Component({
  selector: 'app-medical',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './medical.component.html',
  styleUrl: './medical.component.css'
})
export class MedicalComponent {
  @Input() id!:string;
  @ViewChild('closebutton') closebutton: any;

  medicalForm: FormGroup;
  public types: any;
  private typesId: any;
  public medicals: any;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder
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

    this.isister.getMedical(this.id).subscribe({
      next:(data:any) => {
        this.medicals = data;
      },
      error:(error) => {
        console.log(error.status);
      }
    })
  }

  addMedical(): void {
    if(this.medicalForm.invalid) return;

    const object:any = {
      type: this.typesId[this.medicalForm.value.type],
      date: this.medicalForm.value.date,
      description: this.medicalForm.value.description
    }
  }
}
