import { Component, Input, ViewChild } from '@angular/core';
import { IsisterService } from '../../_services/isister.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-surgery',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './surgery.component.html',
  styleUrl: './surgery.component.css'
})
export class SurgeryComponent {
  @Input() id!: string;
  @ViewChild('closebutton') closebutton: any;

  surgeryForm: FormGroup;
  public types: any;
  private typesId: any;
  public surgeries: any;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder
  ) {
    this.surgeryForm = this.formBuild.group({
      type: [''],
      date: [''],
      preop: [''],
      description: [''],
      result: [''],
      complications: ['']
    })
  }

  ngOnInit(): void {
    this.isister.getSurgeryTypes().subscribe({
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

    this.isister.getSurgery(this.id).subscribe({
      next:(data:any) => {
        data.forEach((surgery:any) => {
          let name = JSON.parse(surgery.type.name);
          surgery.type = name.es;
        })
        this.surgeries = data;
      },
      error:(error) => {
        console.log(error.status);
      }
    })
  }

  addSurgery(): void {
    if(this.surgeryForm.invalid) return;

    const object:any = {
      type: this.typesId[this.surgeryForm.value.type],
      date: this.surgeryForm.value.date,
      preop: this.surgeryForm.value.preop,
      description: this.surgeryForm.value.description,
      result: this.surgeryForm.value.result,
      complications: this.surgeryForm.value.complications
    }

    this.isister.addSurgery(object,this.id).subscribe({
      next:(object:any) => {
        this.closebutton.nativeElement.click();
      },
      error:(error) => {
        console.log(error.status);
      }
    })
  }
}
