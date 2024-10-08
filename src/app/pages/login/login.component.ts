import { Component, inject } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {

  public formBuild = inject(FormBuilder);
  public formLogin: FormGroup = this.formBuild.group({
    email: ['',Validators.required],
    password: ['',Validators.required],

  });
  
  constructor(
    private authService: AuthService, 
    private router: Router,
    private notify: NotificationService
  ) {}

  login() {
    if(this.formLogin.invalid) {
      this.notify.setAlert('Por favor revise las credenciales','danger');
    };

    const object:Login = {
      username: this.formLogin.value.email,
      password: this.formLogin.value.password
    }

    this.authService.login(object).subscribe({
      next:(data) => {
        if(data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token',data.refresh_token);
          this.notify.setAlert('Sesión iniciada!','success');
          this.router.navigate(['/home']);
          window.location.reload();
        } else {
          this.notify.setAlert('Las credenciales no son correctas','danger');
        }
      },
      error:(error) => {
        console.log(error.message);
      }
    })
  }

  register() {
    this.router.navigate(['/register']);
  }
}
