import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';

@Component({
  selector: 'app-treatment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './treatment.component.html',
  styleUrl: './treatment.component.css'
})
export class TreatmentComponent {
  @Input() id!: string;
  @ViewChild('closebutton') closebutton: any;

  treatmentForm: FormGroup;
  public treatments: any;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder
  ) {
    this.treatmentForm = this.formBuild.group({
      description: [''],
      repetition: [''],
      start: [''],
      end: ['']
    })
  }

  ngOnInit(): void {
    this.isister.getTreatment(this.id).subscribe({
      next:(object:any) => {
        this.treatments = object;
      }
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

    this.isister.addTreatment(object,this.id).subscribe({
      next:(data:any) => {
        this.closebutton.nativeElement.click();
      },
      error:(error) => {
        console.log(error.status);
      }
    })
  }
}
