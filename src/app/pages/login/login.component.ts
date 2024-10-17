import { Component, inject } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';
import { NotificationService } from '../../_services/notification.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {

  public isLoading: boolean = false;

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

    this.isLoading = true;

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
        this.isLoading = false;
      },
      error:(error) => {
        this.isLoading = false;
        this.notify.setAlert('Algún error ha sucedido, porfavor intente más tarde','danger');
      }
    })
  }

  register() {
    this.router.navigate(['/register']);
  }
}
