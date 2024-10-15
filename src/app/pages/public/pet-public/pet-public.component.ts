import { Component, ViewChild, inject } from '@angular/core';
import { IsisterService } from '../../../_services/isister.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pet } from '../../../interfaces/Pet';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { VaccinePublicComponent } from '../../../components/public/vaccine-public/vaccine-public.component';
import { AllergiesPublicComponent } from '../../../components/public/allergies-public/allergies-public.component';
import { WalksPublicComponent } from '../../../components/public/walks-public/walks-public.component';
import { DietsPublicComponent } from '../../../components/public/diets-public/diets-public.component';
import { HistoryPublicComponent } from '../../../components/public/history-public/history-public.component';

@Component({
  selector: 'app-pet-public',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    VaccinePublicComponent,
    AllergiesPublicComponent,
    WalksPublicComponent,
    DietsPublicComponent,
    HistoryPublicComponent
  ],
  templateUrl: './pet-public.component.html',
  styleUrl: './pet-public.component.css'
})
export class PetPublicComponent {
  @ViewChild('closebutton') closebutton: any;

  id!: string;
  selectedTab: string = 'Vacunas';
  pet!: Pet;

  public formBuild = inject(FormBuilder);
  public petForm: FormGroup = this.formBuild.group({
    name: [''],
    gender: [''],
    birth: [''],
    race: [''],
    breed: [''],
    code: [''],
    description: [''],
    character: ['']
  })

  public races: any;
  public breeds: any;
  public isLoading: boolean = true;

  constructor(
    private isister: IsisterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['hash'];
    });

    this.isister.getPublicPet(this.id).subscribe({
      next:(object:any) => {
        console.log(object);
        this.getPet(object);
      },
      error:(error) => {
        console.log(error.status);
      }
    });
  }

  getPet(object:any) {
    this.pet = object as Pet;
    this.petForm.patchValue(object);
    this.pet.image = 'https://nucleox.isister.org/storage/'+this.pet.image;
    if(this.pet.gender == 'F') {
      this.pet.gender = 'Hembra';
    } else {
      this.pet.gender = 'Macho';
    }
    this.calculateAge();
    this.isLoading = false;
    localStorage.setItem('Pet', JSON.stringify(this.pet));
  }

  onTabChange(tabName: string) {
    this.selectedTab = tabName;
  }

  calculateAge(): void {
    const today = new Date();
    const millisecondsDiff = today.getTime() - Date.parse(this.pet.birth);
    let years = Math.floor(millisecondsDiff / (1000*60*60*24*365));
    let months = Math.floor((millisecondsDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));

    if (years > 1) {
      this.pet.age = years+" años";
    } else if (years = 1) {
      this.pet.age = years+" año";
    } else {
      this.pet.age = months+" meses";
    }
  }
}
