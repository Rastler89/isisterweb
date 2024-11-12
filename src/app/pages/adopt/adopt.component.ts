import { Component, inject } from '@angular/core';
import { NotificationService } from '../../_services/notification.service';
import { IsisterService } from '../../_services/isister.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-adopt',
  standalone: true,
  imports: [
    LoadingComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './adopt.component.html',
  styleUrl: './adopt.component.css'
})
export class AdoptComponent {

  public isLoading = true;
  public paises: any;
  public filteredStates: any;
  public species: any [] = [];

  public formBuild = inject(FormBuilder);

  public formSearch: FormGroup = this.formBuild.group({
    country: [''],
    state: [''],
    specie: ['']
  })

  constructor(
    private isister: IsisterService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.isister.getCountries().subscribe({
      next:(data) => {
        let array = Object.values(data);
        let result: any[] = [];

        array.forEach((country:any) => {
          country['name'] = JSON.parse(country['name']);
          let name = country['name']['en'];

          country.states.forEach((state:any) => {
            state['name'] = JSON.parse(state['name']);
          });

          let subArr: { name: string, id: string, iso:string, states: any } = {
            name: name,
            id: country['id'],
            iso: country['iso'],
            states: country['states']
          };
            
          result.push(subArr);
        });

        this.paises = result;
      }
    })

    this.isister.getSpecies().subscribe({
      next:(data) => {
        let array = Object.values(data);
        let result: any[] = [];
        array.forEach((race:any) => {
          let list = {
            id: race.id,
            name: race['name']['es']
          };
          result.push(list);    
        });
        this.species = result;
        this.isLoading = false;
      }
    })
  }

  filtrarEstados () {
    this.filteredStates = this.paises.find((p: { iso: any; }) => p.iso === this.formSearch.value.country)?.states;
  }

  mostrar() {
    console.log(this.species);
  }
}
