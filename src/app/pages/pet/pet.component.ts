import { Component, ViewChild, inject } from '@angular/core';
import { IsisterService } from '../../_services/isister.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VaccinesComponent } from '../../components/vaccines/vaccines.component';
import { AllergiesComponent } from '../../components/allergies/allergies.component';
import { DietsComponent } from '../../components/diets/diets.component';
import { WalksComponent } from '../../components/walks/walks.component';
import { HistoryComponent } from '../../components/history/history.component';
import { Pet } from '../../interfaces/Pet';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [
    CommonModule,
    VaccinesComponent,
    AllergiesComponent,
    DietsComponent,
    WalksComponent,
    HistoryComponent,
    ReactiveFormsModule,
    LoadingComponent,
],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent {
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
      this.id = params['id'];
    });

    this.isister.getPet(this.id).subscribe({
      next:(object:any) => {
        this.getPet(object);
      },
      error:(error) => {
        console.log(error.status);
      }
    });

    /*if (this.pet.image != undefined) {
      this.pet.image = appsettings.apiUrl+'/storage/'+this.pet.image;
    }*/

    this.isister.getDiseases().subscribe({
      next:(object:any) => {
        let array: any[] = [];
        object.forEach((obj:any) => {
          let count = 0;
          obj.name = JSON.parse(obj.name);
          
          obj.species.forEach((sp:any) => {
            if (sp.id == this.pet.specie_id) {
              count = 1
            }
          })
          if (count > 0) {
            array.push(obj);
          }
        });

        localStorage.setItem('enf',JSON.stringify(array));
      },
      error:(error) => {
        console.log(error.status)
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
    console.log(this.pet);
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

  updatePet(): void {
    if (this.petForm.invalid) {
      console.log('fail');
    }

    const object:any = {
      name: this.petForm.value.name,
      gender: this.petForm.value.gender,
      birth: this.petForm.value.birth,
      race: this.petForm.value.race,
      description: this.petForm.value.description,
      character: this.petForm.value.character
    }

    this.isister.updatePet(object,this.id).subscribe({
      next:(data) => {
        this.getPet(data);
        this.closebutton.nativeElement.click();
      },
      error:(error) => {
        console.log(error.status);
      }
    })
  }

  actualizar() {
    this.isLoading = true;
    this.isister.getPet(this.id).subscribe({
      next:(object:any) => {
        this.getPet(object);
        this.isLoading = false;
      },
      error:(error) => {
        this.isLoading=false;
      }
    });
  }

  confirmDown(): void {
    
  }
}
