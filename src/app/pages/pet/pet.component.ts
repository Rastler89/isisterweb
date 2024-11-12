import { Component, ViewChild, inject } from '@angular/core';
import { IsisterService } from '../../_services/isister.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VaccinesComponent } from '../../components/vaccines/vaccines.component';
import { AllergiesComponent } from '../../components/allergies/allergies.component';
import { DietsComponent } from '../../components/diets/diets.component';
import { WalksComponent } from '../../components/walks/walks.component';
import { HistoryComponent } from '../../components/history/history.component';
import { Pet } from '../../interfaces/Pet';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NotificationService } from '../../_services/notification.service';

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
    character: [''],
    is_in_adoption: ['']
  });
  public constantForm: FormGroup = this.formBuild.group({
    size: [''],
    weight: ['']
  })

  public races: any;
  public breeds: any;
  public isLoading: boolean = true;
  public isLoading2: boolean = false;

  constructor(
    private isister: IsisterService,
    private route: ActivatedRoute,
    private notify: NotificationService,
    private router: Router
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

    let constants:any[] = [];
    this.pet.constants.forEach((constant:any) => {
      if (constants[constant['type']] == undefined) {
        constants[constant['type']] = [];
      }
      constants[constant['type']].push(constant);
    })

    this.pet.constants = constants;

    if(this.pet.constants.length == 0) {
      this.constantForm.setValue({
        size: 0,
        weight: 0
      })
    } else {
      this.constantForm.setValue({
        size: this.pet.constants[1][0]['value'],
        weight: this.pet.constants[2][0]['value']
      })
    }

    this.isLoading = false;
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
      this.notify.setAlert('Porfavor rellene los campos obligatorios','danger');
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
        this.notify.setAlert('Cambios añadidos con éxito!','success');
      },
      error:(error) => {
        this.notify.setAlert('No se han podido añadir los cambios','danger');
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

  saveSize(): void {

    if(this.constantForm.value.size == '' || this.constantForm.value.size == this.pet.constants[1][0]['value']) {
      this.notify.setAlert('Introduce un tamaño diferente al actual','warning');
      return;
    }

    const obj:any = {
      value: this.constantForm.value.size
    }

    this.isister.addSize(obj,this.id).subscribe({
      next:(data) => {
        this.notify.setAlert('Constante añadida','success');
        this.actualizar();
      },
      error:(error) => {
        this.notify.setAlert('No se ha podido añadir','danger');
      }
    })
  }

  saveWeight(): void {
    if(this.constantForm.value.weight == '' || this.constantForm.value.weight == this.pet.constants[2][0]['value']) {
      this.notify.setAlert('Introduce un peso diferente al actual','warning');
      return;
    }

    const obj:any = {
      value: this.constantForm.value.weight
    }

    this.isister.addWeight(obj,this.id).subscribe({
      next:(data) => {
        this.notify.setAlert('Constante añadida','success');
        this.actualizar();
      },
      error:(error) => {
        this.notify.setAlert('No se ha podido añadir','danger');
      }
    })
  }

  confirmDown(name:string): void {
    if(confirm("Estas segur@ que quieres dar de baja a "+name)) {
      this.isister.changeState({"value":0},this.id).subscribe({
        next:(data) => {
          this.notify.setAlert('Mascota dada de baja','success');
          this.router.navigate(['/home']);
        }
      })
    }
  }

  changeAdoption(value:boolean): void {
    this.isLoading2 = true;
    this.isister.changeAdoption(value,this.id).subscribe({
      next:(data) => {
        this.pet.is_in_adoption = value;
        this.isLoading2 = false;
      }
    })
  }
}
