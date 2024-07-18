import { Component, Input, ViewChild } from '@angular/core';
import { CalendarComponent } from "../calendar/calendar.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';
import { Pet } from '../../interfaces/Pet';

@Component({
  selector: 'app-diets',
  standalone: true,
  imports: [
    CalendarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './diets.component.html',
  styleUrl: './diets.component.css'
})
export class DietsComponent {
  @Input() id!:string;
  @ViewChild('closebutton') closebutton: any;

  dietForm: FormGroup;

  public pet: Pet;
  public diets: any;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder
  ) {
    this.pet = JSON.parse(localStorage.getItem('Pet')!);

    this.dietForm = this.formBuild.group({
      dayOfWeek: ['',Validators.required],
      time: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
    this.isister.getDiet(this.id).subscribe({
      next:(data:any) => {
        this.diets = data;
        console.log(data);
      },
      error:(error) => {
        console.log(error.status);
      }
    })
  }

  addDiet(): void {
    if(this.dietForm.invalid) return;

    const object:any = {
      DayOfWeek: this.dietForm.value.dayOfWeek,
      time: this.dietForm.value.time,
      description: this.dietForm.value.description
    }

    this.isister.addDiet(object,this.id).subscribe({
      next:(object:any) => {
        this.closebutton.nativeElement.click();
      },
      error:(error) => {
        console.log(error.status);
      }
    })
  }
}
