import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { NotificationService } from '../../_services/notification.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public formBuild = inject(FormBuilder);
  public formRegister: FormGroup = this.formBuild.group({
    name: ['',Validators.required],
    email: ['',Validators.required],
    password: ['',Validators.required],
    confirmPassword: ['',Validators.required]
  }, {
    validator: this.validarContrasenas
  });

  constructor (
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService
  ) { }

  validarContrasenas(formGroup: FormGroup) {
    const { password, confirmPassword } = formGroup.controls;
    return password.value == confirmPassword.value ? null : {contrasenasNoCoinciden: true};
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {

    if (this.formRegister.value.honey) {
      return;
    }

    this.authService.register(this.formRegister.value).subscribe({
      next: (data:any) => {
        this.notify.setAlert('Registro exitoso','success');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        let errors = error.error.error;

        if(errors.name) {
          this.notify.setAlert(errors.name[0],'error');
          console.log(errors.name[0]);
        }
        if(errors.email) {
          this.notify.setAlert(errors.email[0],'error');
          console.log(errors.email[0]);
        }
        if(errors.password) {
          this.notify.setAlert(errors.password[0],'error');
          console.log(errors.password[0]);
        }
      }
    });
  }
}
