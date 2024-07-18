import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';
import { Pet } from '../../interfaces/Pet';

@Component({
  selector: 'app-allergies',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './allergies.component.html',
  styleUrl: './allergies.component.css'
})
export class AllergiesComponent {
  @Input() id!: string
  @ViewChild('closebutton') closebutton: any;

  allergyForm: FormGroup;

  public pet: Pet;
  public allergies: any;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder
  ) {
    this.pet = JSON.parse(localStorage.getItem('Pet')!);

    this.allergyForm = this.formBuild.group({
      name: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
    this.isister.getAllergies(this.id).subscribe({
      next:(data:any) => {
        this.allergies = data;
      }, 
      error:(error) => {
        console.log(error.status);
      }
    })
  }

  addAllergy(): void {
    if(this.allergyForm.invalid) return;

    const object:any = {
      name: this.allergyForm.value.name,
      description: this.allergyForm.value.description
    }

    this.isister.addAllergy(object,this.id).subscribe({
      next:(object:any) => {
        this.closebutton.nativeElement.click();
      },
      error:(error) => {
        console.log(error.status);
      }
    })
  }
}
