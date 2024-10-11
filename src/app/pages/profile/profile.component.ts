import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';
import { NotificationService } from '../../_services/notification.service';
import { AuthService } from '../../_services/auth.service';
import { InputPasswordComponent } from "../../components/input-password/input-password.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    InputPasswordComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  public isLoading = true;

  public formBuild = inject(FormBuilder);
  public formPass: FormGroup = this.formBuild.group({
    oldPassword: ['',Validators.required],
    newPassword: ['',Validators.required],
    rePassword: ['',Validators.required]
  });
  public formProfile: FormGroup = this.formBuild.group({
    name: ['',Validators.required],
    surname: [''],
    phone: [''],
    country: [''],
    state: [''],
    town: [''],
    adress: [''],
    cp: ['']
  });

  public paises: any;
  public filteredStates: any;
  public filteredTowns: any;
  public profile: any;

  constructor (
    private authService: AuthService,
    private isister: IsisterService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.isister.getProfile().subscribe({
      next:(data:any) => {
        this.profile = data;
      }
    })
    this.isister.getCountries().subscribe({
      next:(data) => {
        let array = Object.values(data);
        let result: any[] = [];
        let states: any[] = [];
        let towns: any[] = [];

        array.forEach((country:any) => {
          country['name'] = JSON.parse(country['name']);
          let name = country['name']['en'];

          country.states.forEach((state:any) => {
            state['name'] = JSON.parse(state['name']);
            state.towns.forEach((town:any) => {
              town['name'] = JSON.parse(town['name']);
            });
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
        this.isLoading = false;
      }
    })
  }

  changePassword() {
    if(this.formPass.invalid) {
      this.notify.setAlert('Por favor revise las credenciales','danger');
    }

    if(this.formPass.value.newPassword != this.formPass.value.rePassword) {
      this.notify.setAlert('Las contraseñas no coinciden, porfavor revise repetir bien la contraseña','danger');
    }

    if(this.formPass.value.oldPassword == this.formPass.value.newPassword) {
      this.notify.setAlert('La nueva contraseña no puede ser la misma que la anterior','danger');
    }

    const passwords:any = {
      oldPassword: this.formPass.value.oldPassword,
      newPassword: this.formPass.value.newPassword,
      rePassword: this.formPass.value.rePassword
    }

    this.authService.changePassword(passwords).subscribe({
      next: (data) => {
        this.notify.setAlert('Contraseña canviada!','success');
      },
      error: (error) => {
        this.notify.setAlert('No se han podido modificar los canvios','danger');
      }
    })
  }

  filtrarEstados () {
    this.filteredStates = this.paises.find((p: { iso: any; }) => p.iso === this.formProfile.value.country)?.states;
  }

  filtrarCiudades() {
    this.filteredTowns = this.filteredStates.find((p: { name: { en: any; }; }) => p.name.en === this.formProfile.value.state)?.towns;
  }

  changeData() {
    if(this.formProfile.invalid) {
      this.notify.setAlert('Por favor revise las credenciales','danger');
    }

    let town = this.filteredTowns.find((p: { name: { en: any;};}) => p.name.en === this.formProfile.value.town);

    const profile:any = {
      name: this.formProfile.value.name,
      surname: this.formProfile.value.surname,
      phone: this.formProfile.value.phone,
      country: town.country_id,
      state: town.state_id,
      town: town.id,
      adress: this.formProfile.value.adress,
      cp: this.formProfile.value.adress
    }

    
  }

}
