import { Component, OnInit, inject } from '@angular/core';
import { IsisterService } from '../../_services/isister.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pet, responsePet } from '../../interfaces/Pet';
import { PetComponent } from '../../components/pet/pet.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PetComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public formBuild = inject(FormBuilder);
  public petForm: FormGroup = this.formBuild.group({
    name: ['',Validators.required],
    gender: ['',Validators.required],
    birth: ['',Validators.required],
    race: ['',Validators.required],
    breed: ['',Validators.required],
    code: ['',Validators.required]
  });

  public races: any;
  public breeds: any;
  public isLoading: boolean = true;
  public pets: Pet[] | undefined;
  public qty: number = 0;

  constructor(private isister: IsisterService) { }


  ngOnInit(): void {
    this.isister.getPets().subscribe({
      next:(object:any) => {
        const petResponse = object as responsePet;
        this.pets = petResponse.data;
        this.qty = petResponse.count;
        this.isLoading = false;
      }, 
      error:(error) => {
        console.log(error.status);
      }
    });

    this.isister.getSpecies().subscribe({
      next:(data) => {
        let array = Object.values(data);
        let result: any[] = [];
        array.forEach((race:any) => {
          result[race['name']['es']] = race.breeds;
          let subArray = Object.values(race.breeds);
          let res: any[] = [];
          subArray.forEach((raza:any) => {
            res[raza['name']['es']] = raza['id'];
          });
          result[race['name']['es']]['values'] = res;
        });
        this.races = data;
        this.breeds = result;
        console.log(this.breeds);
        console.log(this.breeds['Cat']['values']['European']);
      }, 
      error:(error) => {
        console.log(error.status);
      }
    });
  }

  addPet() {
    if (this.petForm.invalid) return;

    const object:Pet = {
      name: this.petForm.value.name,
      gender: this.petForm.value.gender,
      birth: this.petForm.value.birth,
      race: this.petForm.value.race,
      breed: this.petForm.value.breed,
      code: this.petForm.value.code
    }


    object.breed = this.breeds[object.race]['values'][object.breed];

    this.isister.addPet(object).subscribe({
      next:(data) => {
        console.log(data);
      }, 
      error:(error) => {
        console.log(error.status);
      }
    })
  }

}
