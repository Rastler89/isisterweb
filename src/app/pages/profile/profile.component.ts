import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';
import { NotificationService } from '../../_services/notification.service';
import { AuthService } from '../../_services/auth.service';
import { InputPasswordComponent } from "../../components/input-password/input-password.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    InputPasswordComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  public formBuild = inject(FormBuilder);
  public formPass: FormGroup = this.formBuild.group({
    oldPassword: ['',Validators.required],
    newPassword: ['',Validators.required],
    rePassword: ['',Validators.required]
  });

  constructor (
    private authService: AuthService,
    private isister: IsisterService,
    private notify: NotificationService
  ) {}

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

}
