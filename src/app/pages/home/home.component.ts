import { Component, OnInit, inject } from '@angular/core';
import { IsisterService } from '../../_services/isister.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pet } from '../../interfaces/Pet';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
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
  private values: any;

  constructor(private isister: IsisterService) { }

  public mascotas: Pet[] = [
    {
      name: "Luna",
      gender: "Hembra",
      birth: "2020-01-31",
      race: "Perro",
      breed: "Pastor Aleman",
      code: "MASC001",
      imageUrl: "https://www.pexels.com/es-es/buscar/Pastor%20alem%C3%A1n/"
    },
    {
      name: "Bigotes",
      gender: "Macho",
      birth: "2022-05-12",
      race: "Gato",
      breed: "Siamés",
      code: "MASC002",
      imageUrl: "https://www.pexels.com/search/siamese%20cat/"
    },
    {
      name: "Nemo",
      gender: "Macho",
      birth: "2021-11-09",
      race: "Pez",
      breed: "Payaso",
      code: "MASC003",
      imageUrl: "https://es.wikipedia.org/wiki/Amphiprioninae"
    }
  ];

  ngOnInit(): void {
    this.isister.getPets().subscribe({
      next:(data) => {
        console.log(data);
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
          subArray.forEach((breed:any) => {
            res[breed['name']['es']] = breed['id'];
          });
          result[race['name']['es']]['values'] = res;
        });
        this.races = data;
        this.breeds = result;
        console.log(this.breeds);
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
